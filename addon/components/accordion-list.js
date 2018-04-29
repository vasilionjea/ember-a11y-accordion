import Component from '@ember/component';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-list';

/**
 * The accordion-list component is the top-most component and is responsible
 * for registering accordion items and toggling their panels.
 *
 * @param {Boolean} [isCollapsible] If this accordion should be a collapsible
 * @param {Function} [onShow] Action to execute when a panel is expanded (executed for both accordions & collapsibles)
 * @param {Function} [onHide] Action to execute when a panel is collapsed (executed only for collapsibles)
 * @example
 * {{#accordion-list isCollapsible=true as |accordion|}}
 *   {{#accordion.item as |item|}}
 *     {{#item.header}}Lorem Ipsum{{/item.header}}
 *     {{#item.panel}}Lorem ipsum dolor{{/item.panel}}
 *   {{/accordion.item}}
 * {{/accordion-list}}
 */
export default Component.extend({
  layout,
  tagName: 'dl',
  role: 'presentation',
  classNames: [CLASS_NAMES.list],
  attributeBindings: ['role'],

  /**
   * When `true` the component acts like a collapsible, and multiple
   * panels can be expanded or collapsed at the same time.
   *
   * @public
   */
  isCollapsible: false,

  /**
   * @override
   */
  init() {
    this._super(...arguments);
    this.set('items', A());
  },

  /**
   * Handles toggling for collapsibles.
   *
   * @param {Object} item
   * @private
   */
  _toggleCollapsible(item) {
    const onShow = this.get('onShow');
    const onHide = this.get('onHide');

    item.toggleProperty('isExpanded');

    if (item.get('isExpanded') === true) {
      isPresent(onShow) && onShow();
    } else {
      isPresent(onHide) && onHide();
    }
  },

  /**
   * Handles toggling for accordions.
   *
   * @param {Object} itemToShow
   * @private
   */
  _toggleAccordion(itemToShow) {
    // Do nothing if accordion item is already expanded.
    if (itemToShow.get('isExpanded') === true) {
      return;
    }

    const onShow = this.get('onShow');

    // Hide all other items
    this.get('items').forEach(item => {
      if (item !== itemToShow) {
        item.set('isExpanded', false);
      }
    });

    // Show this one
    itemToShow.set('isExpanded', true);
    isPresent(onShow) && onShow();
  },

  actions: {
    /**
     * Action for item components to register themselves.
     *
     * @param {Object} itemToShow
     * @public
     */
    registerItem(item) {
      if (isPresent(item)) {
        this.get('items').pushObject(item);
      }
    },

    /**
     * Action to handle toggling for the accordion panels.
     *
     * @param {Object} itemToShow
     * @public
     */
    toggleItem(item) {
      if (!isPresent(item)) {
        return;
      }

      if (this.get('isCollapsible') === true) {
        this._toggleCollapsible(item);
      } else {
        this._toggleAccordion(item);
      }
    },
  },
});
