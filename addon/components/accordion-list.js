import Component from '@ember/component';
import { next, cancel } from '@ember/runloop';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/accordion-list';
import {
  CLASS_NAMES,
  setOpenHeight,
  setClosedHeight,
  addEventListenerOnce,
} from '../utils/dom';

/**
 * The accordion-list component is the top-most component and is responsible
 * for registering accordion items and toggling their panels.
 *
 * @param {Function} [onShow] Action to execute when a panel is expanded
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

    // Timeout for the animated hide
    this._currentHideTimeout = null;

    this.setProperties({
      items: A(),
      activeItem: null,
    });
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
      if (item.get('isExpanded')) {
        item.panelWrapper.style.height = null;
      }
    });
  },

  /**
   * Handles hiding an item without animation.
   *
   * @param {Object} item
   * @private
   */
  simpleHide(item) {
    item.setProperties({
      isExpanded: false,
      'panelWrapper.style.display': 'none',
    });
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
    if (this.activeItem) {
      // From open height
      setOpenHeight(this.activeItem);
    }

    cancel(this._currentHideTimeout);

    // Set close height
    this._currentHideTimeout = next(() => {
      setClosedHeight(item);
      item.set('isExpanded', false);
    });
  },

  /**
   * @override
   */
  willDestroyElement() {
    cancel(this._currentHideTimeout);
    this.set('items', null);
  },

  actions: {
    /**
     * Action for item components to register themselves.
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
      if (item.get('isExpanded')) {
        this.activeItem = item;
      } else {
        this.get('animation')
          ? setClosedHeight(item)
          : this.simpleHide(item);
      }
    },

    /**
     * Action to toggle accordion items.
     *
     * @param {Object} item
     * @public
     */
    toggleItem(item) {
      if (
        !isPresent(item) ||
        item.get('isDisabled') ||
        item.get('isExpanded')
      ) {
        return;
      }

      // If no items have expandOnInit, then there isn't an active one yet.
      if (this.activeItem) {
        // Hide active item
        this.get('animation')
          ? this.animatedHide(this.activeItem)
          : this.simpleHide(this.activeItem);
      }

      // Show this one
      this.get('animation')
        ? this.animatedShow(item)
        : this.simpleShow(item);

      this.activeItem = item;
      this.get('onShow') && this.get('onShow')();
    },
  },
});
