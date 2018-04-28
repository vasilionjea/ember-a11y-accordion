import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-item';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: [CLASS_NAMES.item],
  classNameBindings: [`isExpanded:${CLASS_NAMES.itemExpanded}`],
  expandOnInit: false,
  isExpanded: computed.oneWay('sharedState.isExpanded'),

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    const sharedState = EmberObject.create({
      id: this.elementId,
      isExpanded: this.get('expandOnInit'),
    });

    this.set('sharedState', sharedState);
    this.get('register')(sharedState);
  },

  /**
   * @override
   */
  click() {
    this.get('toggle')(this.get('sharedState'));
  },
});
