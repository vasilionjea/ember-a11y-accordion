import {
  CLASS_NAMES,
  addEventListenerOnce,
  setClosedHeight,
  setOpenHeight,
} from 'ember-a11y-accordion/utils/dom';
import { next, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

/**
 * The accordion-list component is the top-most component and is responsible
 * for registering accordion items and toggling their panels.
 *
 * @param {Function} [onShow] Action to execute when a panel is being shown
 * @param {Function} [onAfterShow] Action to execute when a panel is fully shown
 * @param {String} [class] Any CSS classes to be added to the component's element
 * @param {Boolean} [animation] Whether or not it should animate items
 *
 * @example
 * {{#accordion-list as |accordion|}}
 *   {{#accordion.item as |item|}}
 *     {{#item.header}}Lorem Ipsum{{/item.header}}
 *     {{#item.panel}}Lorem ipsum dolor{{/item.panel}}
 *   {{/accordion.item}}
 * {{/accordion-list}}
 */
export default class AccordionListClass extends Component {
  get animation() {
    return isPresent(this.args.animation) ? this.args.animation : true;
  }

  className = CLASS_NAMES.list;

  @tracked
  _activeItem;

  @tracked
  _currentHideTimeout;

  _items = A();

  /**
   * Action for item components to register themselves.
   *
   * @param {Object} item
   * @public
   */
  @action
  registerItem(item) {
    if (!isPresent(item)) {
      return;
    }

    this._items.push(item);

    // At register time close respective items
    if (item.isExpanded) {
      this._activeItem = item;
    } else {
      this.animation
        ? setClosedHeight(item)
        : this._simpleHide(item);
    }
  }

  /**
   * Action to toggle accordion items.
   *
   * @param {Object} item
   * @public
   */
  @action
  toggleItem(item) {
    if (
      !isPresent(item) ||
      item.isDisabled ||
      item.isExpanded
    ) {
      return;
    }

    // If no items have expandOnInit, then there isn't an active one yet.
    if (this._activeItem) {
      // Hide active item
      this.animation
        ? this._animatedHide(this._activeItem)
        : this._simpleHide(this._activeItem);
    }

    // Show this one
    if (this.animation) {
      this._animatedShow(item)
      this._triggerEvent('onShow', item);
    } else {
      this._simpleShow(item);
      this._triggerEvent('onShow', item);
      this._triggerEvent('onAfterShow', item);
    }

    this._activeItem = item;
  }

  willDestroy() {
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
    if (this._activeItem) {
      // From open height
      setOpenHeight(this._activeItem);
    }

    cancel(this._currentHideTimeout);

    // Set close height
    this._currentHideTimeout = next(() => {
      setClosedHeight(item);
      item.isExpanded = false;
    });
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
      if (item.isExpanded) {
        item.panelWrapper.style.height = null;
        this._triggerEvent('onAfterShow', item);
      }
    });
  }

  /**
   * Handles hiding an item without animation.
   *
   * @param {Object} item
   * @private
   */
  _simpleHide(item) {
    item.isExpanded = false;
    item.panelWrapper.style.display = 'none';
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
    this.args[eventName] && this.args[eventName]({
      name: item.name
    });
  }
}
