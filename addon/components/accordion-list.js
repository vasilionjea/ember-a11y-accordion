import Component from '@ember/component';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-list';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: [CLASS_NAMES.list],

  isCollapsible: false,

  /**
   * @override
   */
  init() {
    this._super(...arguments);
    this.set('items', A());
  },

  actions: {
    registerItem(item) {
      if (isPresent(item)) {
        this.get('items').pushObject(item);
      }
    },

    showItem(itemToShow) {
      // Do nothing if we have no item to show, or item is already expanded.
      if (!isPresent(itemToShow) || itemToShow.get('isExpanded') === true) {
        return;
      }

      // Hide all other items
      this.get('items').forEach(item => {
        if (item !== itemToShow) {
          item.set('isExpanded', false);
        }
      });

      // Show this one
      itemToShow.set('isExpanded', true);
    },

    toggleItem(item) {
      // Do nothing if we have no item to toggle.
      if (!isPresent(item)) {
        return;
      }

      item.toggleProperty('isExpanded');
    },
  },
});
