import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import Component from '@glimmer/component';
import SharedState from 'ember-a11y-accordion/utils/shared-state';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

/**
 * The accordion-item component is responsible for creating state and sharing it with the
 * accordion-list or collapsible-list. This component provides the primary API to
 * create a header and panel component.
 *
 * @param {Boolean} [expandOnInit] Whether or not to expand this item on init
 * @param {Boolean} [isDisabled] Whether or not this item should be disabled (user will not be able to expand it)
 * @param {String} [class] Any CSS classes to be added to the component's element
 * @param {String} [name] A canonical name to refer to an accordion-item (e.g. "item-1")
 */
export default class AccordionItem extends Component {
  get classNames() {
    const classNames = [CLASS_NAMES.item];
    if (this.isDisabled) {
      classNames.push(CLASS_NAMES.itemDisabled);
    }
    if (this.isExpanded) {
      classNames.push(CLASS_NAMES.itemExpanded);
    }
    return classNames.join(' ');
  }

  @tracked
  sharedState;

  get isDisabled() {
    return this.args.isDisabled;
  }

  get isExpanded() {
    return this.sharedState.isExpanded;
  }

  constructor() {
    super(...arguments);
    this.sharedState = new SharedState({
      headerId: guidFor({}),
      triggerId: guidFor({}),
      panelId: guidFor({}),
      isExpanded: this.args.expandOnInit,
      isDisabled: this.args.isDisabled,
      name: this.args.name,
    });
  }

  @action
  didInsert(element) {
    const sharedState = this.sharedState;
    const panelWrapper = element.querySelector(`.${CLASS_NAMES.panelWrapper}`);
    sharedState.panelWrapper = panelWrapper;
    sharedState.panelContent = panelWrapper.querySelector(
      `.${CLASS_NAMES.panelContent}`
    );

    this.args.register(sharedState);
  }

  @action
  willDestroy() {
    super.willDestroy(...arguments);
    this.sharedState = null;
  }
}
