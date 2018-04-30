import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-item';

/**
 * The accordion-item component is responsible for creating state and sharing
 * it with the accordion-list. This component provides the primary API to
 * create an item header and panel.
 *
 * @param {Boolean} [expandOnInit] Whether or not to expand this item on init
 * @param {Boolean} [isDisabled] Whether or not this item should be disabled (user will not be able to expand it)
 * @example
 * {{#accordion-list as |accordion|}}
 *   {{#accordion.item expandOnInit=true as |item|}}
 *     {{#item.header}}Lorem Ipsum{{/item.header}}
 *     {{#item.panel}}Lorem ipsum dolor{{/item.panel}}
 *   {{/accordion.item}}
 * {{/accordion-list}}
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
    const headerElement = this.element.querySelector(`.${CLASS_NAMES.header}`);

    sharedState.setProperties({
      element: this.element,
      height: this.element.getBoundingClientRect().height,
      header: {
        element: headerElement,
        height: headerElement.getBoundingClientRect().height,
      },
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
