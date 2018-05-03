import Component from '@ember/component';
import { next } from '@ember/runloop';
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
 * @param {String} [classNames] Any CSS classes to be added to the component's element
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
   * @override
   */
  init() {
    this._super(...arguments);
    this.setProperties({
      items: A(),
      activeItem: null,
    });
  },

  /**
   * Handles showing an item.
   *
   * When the CSS transition has ended, we clear the inline height so the
   * component's contents don't get cutt off in responsive layouts.
   *
   * @param {Object} item
   * @private
   */
  showItem(item) {
    setOpenHeight(item);
    item.set('isExpanded', true);

    // Remove the inline height after the transition so contents don't
    // get cut off when resizing the browser window.
    addEventListenerOnce(item.panelWrapper, 'transitionend', () => {
      if (item.get('isExpanded')) {
        item.panelWrapper.style.height = null;
      }
    });

    if (this.get('onShow')) {
      this.get('onShow')();
    }
  },

  /**
   * Handles hiding an item.
   *
   * CSS transitions don't transition from "no value" to a value, so
   * before we set the element's height to close it, first we
   * calculate its current open height and set it.
   *
   * @param {Object} item
   * @private
   */
  hideItem(item) {
    if (this.activeItem) {
      // From open height
      setOpenHeight(this.activeItem);
    }

    // Set close height
    next(() => {
      setClosedHeight(item);
      item.set('isExpanded', false);
    });
  },

  /**
   * @override
   */
  willDestroyElement() {
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
        setClosedHeight(item);
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

      // If no items have expandOnInit, then there
      // isn't an active one yet.
      if (this.activeItem) {
        this.hideItem(this.activeItem);
      }

      // Show this one
      this.showItem(item);
      this.activeItem = item;
    },
  },
});
