import Component from '@ember/component';
import { computed } from '@ember/object';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-panel';

export default Component.extend({
  layout,
  tagName: 'section',
  classNames: [CLASS_NAMES.panel],
  attributeBindings: ['aria-hidden'],

  'aria-hidden': computed('isExpanded', function() {
    return this.get('isExpanded') ? 'false' : 'true';
  }),
});
