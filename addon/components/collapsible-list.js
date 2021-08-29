import {
  CLASS_NAMES,
  addEventListenerOnce,
  setClosedHeight,
  setOpenHeight,
} from 'ember-a11y-accordion/utils/dom';
import { cancel, later } from '@ember/runloop';
import { A } from '@ember/array';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

/**
 * This slight delay is used when hiding an item with CSS transitions. Because a visible
 * panel doesn't have an inline height (for responsive reasons it's removed), first we
 * insert its computed height inline, then after this delay we reset the inline height
 * to 0px so the CSS transition will kick off.
 */
const INLINE_HEIGHT_DELAY = 50;

/**
 * The collapsible-list component is the top-most component and is responsible
 * for registering collapsible items and toggling their panels.
 *
 * @param {Function} [onShow] Action to execute when a panel is being shown
 * @param {Function} [onAfterShow] Action to execute when a panel is fully shown
 * @param {Function} [onHide] Action to execute when a panel is being collapsed
 * @param {String} [class] Any CSS classes to be added to the component's element
 * @param {Boolean} [animation] Whether or not it should animate items
 *
 * @example
 * {{#collapsible-list as |collapsible|}}
 *   {{#collapsible.item as |item|}}
 *     {{#item.header}}Lorem Ipsum{{/item.header}}
 *     {{#item.panel}}Lorem ipsum dolor{{/item.panel}}
 *   {{/collapsible.item}}
 * {{/collapsible-list}}
 */
export default class CollapsibleListComponent extends Component {
  get animation() {
    return isPresent(this.args.animation) ? this.args.animation : true;
  }

  className = CLASS_NAMES.list;

  @tracked
  _currentHideTimeout = null;

  _items = A();

  @tracked
  _isHiding = false;

  @action
  registerItem(item) {
    if (!isPresent(item)) {
      return;
    }

    this._items.push(item);

    // At register time close respective items
    if (!item.isExpanded) {
      this.animation ? setClosedHeight(item) : this._simpleHide(item, true);
    }
  }

  @action
  toggleItem(item) {
    if (!isPresent(item) || item.isDisabled) {
      return;
    }

    if (item.isExpanded) {
      this.animation ? this._animatedHide(item) : this._simpleHide(item);
    } else {
      if (this.animation) {
        this._animatedShow(item);
        this._triggerEvent('onShow', item);
      } else {
        this._simpleShow(item);
        this._triggerEvent('onShow', item);
        this._triggerEvent('onAfterShow', item);
      }
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    cancel(this._currentHideTimeout);
    this._items.splice(0, this._items.length);
  }

  /**
   * Handles hiding an item with animation.
   *
   * CSS transitions don't transition from "no value" to a value, so
   * before we set the element's height to close it, first we
   * calculate its current open height and set it.
   *
   * @param {Object} item
   * @private
   */
  _animatedHide(item) {
    this._isHiding = true;

    // From open height
    setOpenHeight(item);

    cancel(this._currentHideTimeout);

    // Set close height
    this._currentHideTimeout = later(() => {
      setClosedHeight(item);
      item.isExpanded = false;
      this._isHiding = false;

      this._triggerEvent('onHide', item);
    }, INLINE_HEIGHT_DELAY);
  }

  /**
   * Handles showing an item with animation.
   *
   * When the CSS transition has ended, we clear the inline height so the
   * component's contents don't get cutt off in responsive layouts.
   *
   * @param {Object} item
   * @private
   */
  _animatedShow(item) {
    setOpenHeight(item);
    item.isExpanded = true;

    // Remove the inline height after the transition so contents don't
    // get cut off when resizing the browser window.
    addEventListenerOnce(item.panelWrapper, 'transitionend', () => {
      if (item.isExpanded && !this._isHiding) {
        item.panelWrapper.style.height = null;
        this._triggerEvent('onAfterShow', item);
      }
    });
  }

  /**
   * Handles hiding an item without animation.
   *
   * @param {Object} item
   * @param {Boolean} silent
   * @private
   */
  _simpleHide(item, silent) {
    item.isExpanded = false;
    item.panelWrapper.style.display = 'none';

    if (!silent) {
      this._triggerEvent('onHide', item);
    }
  }

  /**
   * Handles showing an item without animation.
   *
   * @param {Object} item
   * @private
   */
  _simpleShow(item) {
    item.isExpanded = true;
    item.panelWrapper.style.display = null;
  }

  /**
   * Triggers an event
   *
   * @param {string} eventName
   * @param {Object} item
   * @private
   */
  _triggerEvent(eventName, item) {
    this.args[eventName] &&
      this.args[eventName]({
        name: item.name,
      });
  }
}
