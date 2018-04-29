import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/accordion-item';

/**
 * The accordion-item is a tagless component, and is responsible for creating
 * state and sharing it with the accordion-list. This component provides
 * the primary API to create an item header and panel.
 *
 * @param {Boolean} [expandOnInit] Whether or not to expand this item's panel on init
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
  tagName: '',
  expandOnInit: false,
  isExpanded: computed.oneWay('sharedState.isExpanded'),

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    const sharedState = EmberObject.create({
      id: this.elementId,
      headerId: guidFor({}),
      triggerId: guidFor({}),
      panelId: guidFor({}),
      isExpanded: this.get('expandOnInit'),
    });

    this.set('sharedState', sharedState);
    this.get('register')(sharedState);
  },
});
