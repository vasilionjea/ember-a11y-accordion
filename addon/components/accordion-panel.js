import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/accordion-panel';
import { CLASS_NAMES } from '../utils/dom';

/**
 * The accordion-panel component contains the contents to be shown at any
 * given point. This component is toggled by the accordion-header.
 *
 * @param {String} [classNames] Any CSS classes to be added to the component's element
 */
export default Component.extend({
  layout,
  tagName: 'section',
  role: 'region',
  classNames: [CLASS_NAMES.panelWrapper],
  attributeBindings: ['role', 'aria-labelledby', 'aria-hidden'],

  'aria-hidden': computed('isExpanded', function() {
    return this.get('isExpanded') ? 'false' : 'true';
  }),

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    const triggerId = this.get('triggerId');

    if (triggerId) {
      this.set('aria-labelledby', triggerId);
    }
  },
});
