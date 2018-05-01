import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/accordion-item';
import { CLASS_NAMES } from '../utils/dom';

/**
 * The accordion-item component is responsible for creating state and sharing it with the
 * accordion-list or collapsible-list. This component provides the primary API to
 * create a header and panel component.
 *
 * @param {Boolean} [expandOnInit] Whether or not to expand this item on init
 * @param {Boolean} [isDisabled] Whether or not this item should be disabled (user will not be able to expand it)
 * @param {String} [classNames] Any CSS classes to be added to the component's element
 */
export default Component.extend({
  layout,
  tagName: 'section',
  classNames: [CLASS_NAMES.item],
  classNameBindings: [
    `isExpanded:${CLASS_NAMES.itemExpanded}`,
    `isDisabled:${CLASS_NAMES.itemDisabled}`,
  ],
  isExpanded: computed.oneWay('sharedState.isExpanded'),
  expandOnInit: false,
  isDisabled: false,

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    const sharedState = EmberObject.create({
      headerId: guidFor({}),
      triggerId: guidFor({}),
      panelId: guidFor({}),
      isExpanded: this.get('expandOnInit'),
      isDisabled: this.get('isDisabled'),
    });

    this.set('sharedState', sharedState);
  },

  /**
   * @override
   */
  didInsertElement() {
    const sharedState = this.get('sharedState');
    sharedState.setProperties({
      element: this.element,
      headerElement: this.element.querySelector(`.${CLASS_NAMES.header}`),
      panelElement: this.element.querySelector(`.${CLASS_NAMES.panel}`),
    });

    this.get('register')(sharedState);
  },

  /**
   * @override
   */
  willDestroyElement() {
    this.set('sharedState', null);
  },
});
