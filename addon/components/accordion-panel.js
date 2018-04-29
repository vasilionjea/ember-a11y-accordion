import Component from '@ember/component';
import { computed } from '@ember/object';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-panel';

/**
 * The accordion-panel component contains the contents to be shown at any
 * given point. This component is toggled by the accordion-header.
 */
export default Component.extend({
  layout,
  tagName: 'dd',
  role: 'region',
  classNames: [CLASS_NAMES.panel],
  classNameBindings: [`isExpanded:${CLASS_NAMES.isExpanded}`],
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
