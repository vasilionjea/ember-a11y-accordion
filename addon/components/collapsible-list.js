import Component from '@ember/component';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/collapsible-list';
import {
  CLASS_NAMES,
  setOpenHeight,
  setClosedHeight,
  addEventListenerOnce,
} from '../utils/dom';

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
 * @param {Function} [onShow] Action to execute when a panel is expanded
 * @param {Function} [onHide] Action to execute when a panel is collapsed
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
export default Component.extend({
  layout,
  classNames: [CLASS_NAMES.list],

  /**
   * Whether or not CSS transition is used.
   */
  animation: true,

  /**
   * @override
   */
  init() {
    this._super(...arguments);
    this.set('items', A());
  },

  /**
   * Handles showing an item without animation.
   *
   * @param {Object} item
   * @private
   */
  simpleShow(item) {
    item.setProperties({
      isExpanded: true,
      'panelWrapper.style.display': null,
    });
  },

  /**
   * Handles showing an item with animation.
   *
   * When the CSS transition has ended, we clear the inline height so the
   * component's contents don't get cutt off in responsive layouts.
   *
   * @param {Object} item
   * @private
   */
  animatedShow(item) {
    setOpenHeight(item);
    item.set('isExpanded', true);

    // Remove the inline height after the transition so contents don't
    // get cut off when resizing the browser window.
    addEventListenerOnce(item.panelWrapper, 'transitionend', () => {
      if (item.get('isExpanded') && !this._isHiding) {
        item.panelWrapper.style.height = null;
      }
    });
  },

  /**
   * Handles hiding an item without animation.
   *
   * @param {Object} item
   * @param {Boolean} silent
   * @private
   */
  simpleHide(item, silent) {
    item.setProperties({
      isExpanded: false,
      'panelWrapper.style.display': 'none',
    });

    if (!silent) {
      this.get('onHide') && this.get('onHide')();
    }
  },

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
  animatedHide(item) {
    this._isHiding = true;

    // From open height
    setOpenHeight(item);

    // Set close height
    later(() => {
      setClosedHeight(item);
      item.set('isExpanded', false);
      this._isHiding = false;

      this.get('onHide') && this.get('onHide')();
    }, INLINE_HEIGHT_DELAY);
  },

  /**
   * @override
   */
  willDestroyElement() {
    this.set('items', null);
  },

  actions: {
    /**
     * Action for item components to register themselves. Registration
     * has to happen when the item is inserted in the DOM.
     *
     * @param {Object} item
     * @public
     */
    registerItem(item) {
      if (!isPresent(item)) {
        return;
      }

      this.get('items').pushObject(item);

      // At register time close respective items
      if (!item.get('isExpanded')) {
        this.get('animation')
          ? setClosedHeight(item)
          : this.simpleHide(item, true);
      }
    },

    /**
     * Action to toggle collapsible items.
     *
     * @param {Object} item
     * @public
     */
    toggleItem(item) {
      if (!isPresent(item) || item.get('isDisabled')) {
        return;
      }

      if (item.get('isExpanded')) {
        this.get('animation')
          ? this.animatedHide(item)
          : this.simpleHide(item);
      } else {
        this.get('animation')
          ? this.animatedShow(item)
          : this.simpleShow(item);

        this.get('onShow') && this.get('onShow')();
      }
    },
  },
});
