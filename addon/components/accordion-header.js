import Component from '@ember/component';
import { computed } from '@ember/object';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-header';

export default Component.extend({
  layout,
  tagName: 'button',
  type: 'button',

  classNames: [CLASS_NAMES.header],

  attributeBindings: [
    'type',
    'aria-expanded',
    'aria-controls',
    'aria-disabled',
  ],

  'aria-expanded': computed('isExpanded', function() {
    return this.get('isExpanded') ? 'true' : 'false';
  }),

  'aria-disabled': computed('isExpanded', function() {
    if (this.get('isCollapsible')) {
      // Never disable when in collapsible mode
      return 'false';
    }

    return this.get('isExpanded') ? 'true' : 'false';
  }),

  /**
   * @override
   */
  didInsertElement() {
    const panel = this.element.nextElementSibling;

    if (panel) {
      this.set('aria-controls', panel.getAttribute('id'));
    }
  },
});
