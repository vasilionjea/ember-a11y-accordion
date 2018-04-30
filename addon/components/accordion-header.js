import Component from '@ember/component';
import { CLASS_NAMES } from '../utils/constants';
import layout from '../templates/components/accordion-header';

const DEFAULT_ARIAL_LEVEL = '3';

/**
 * The accordion-header receives the toggle action and handles expanding
 * or collapsing the respective panel component.
 *
 * @param {String} [aria-level] The ARIA heading level (defaults to "3")
 * @param {String} [classNames] Any CSS classes to be added to the component's element
 */
export default Component.extend({
  layout,
  tagName: 'header',
  role: 'heading',
  classNames: [CLASS_NAMES.header],
  attributeBindings: ['role', 'aria-level'],

  /**
   * @override
   */
  init() {
    this._super(...arguments);
    this.set('aria-level', this.getWithDefault('aria-level', DEFAULT_ARIAL_LEVEL));
  },

  /**
   * @override
   */
  click() {
    this.get('toggle')();
  },
});
