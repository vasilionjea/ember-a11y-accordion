import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import Component from '@glimmer/component';

/**
 * The accordion-panel component contains the contents to be shown at any
 * given point. This component is toggled by the accordion-header.
 *
 * @param {String} [class] Any CSS classes to be added to the component's element
 */
export default class AccordionPanelComponent extends Component {
  className = CLASS_NAMES.panelWrapper;

  get ariaHidden() {
    return this.args.isExpanded ? 'false' : 'true';
  }

  get ariaLabelledBy() {
    return this.args.triggerId || '';
  }
}
