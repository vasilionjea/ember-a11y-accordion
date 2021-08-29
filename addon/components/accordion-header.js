import Component from '@glimmer/component';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';

const DEFAULT_ARIA_LEVEL = '3';

/**
 * The accordion-header receives the toggle action and handles expanding
 * or collapsing the respective panel component.
 *
 * @param {String} [aria-level] The ARIA heading level (defaults to "3")
 * @param {String} [class] Any CSS classes to be added to the component's element
 */

export default class AccordionHeaderComponent extends Component {
  className = CLASS_NAMES.header;

  get ariaDisabled() {
    return this.args.isDisabled ? 'true' : 'false'
  }

  get ariaExpanded() {
    return this.args.isExpanded ? 'true' : 'false';
  }

  get ariaLevel() {
    return this.args.ariaLevel ?? DEFAULT_ARIA_LEVEL;
  }
}