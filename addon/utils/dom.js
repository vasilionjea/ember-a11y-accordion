import { run } from '@ember/runloop';

/**
 * All addon selectos.
 */
const CLASS_NAMES = {
  list: 'a11y-accordion-list',
  item: 'a11y-accordion-item',
  itemExpanded: 'a11y-accordion-item--is-expanded',
  itemDisabled: 'a11y-accordion-item--is-disabled',
  header: 'a11y-accordion-header',
  trigger: 'a11y-accordion-header__trigger',
  panelWrapper: 'a11y-accordion-panel-wrapper',
  panelContent: 'a11y-accordion-panel-content',
};

/**
 * Calculates and set's an items open height.
 *
 * @param {Object} item
 * @public
 */
function setOpenHeight({ panelWrapper, panelContent }) {
  let height = panelContent.getBoundingClientRect().height;
  panelWrapper.style.height = `${height}px`;
}

/**
 * Calculates and set's an items closed height.
 *
 * @param {Object} item
 * @public
 */
function setClosedHeight({ panelWrapper }) {
  panelWrapper.style.height = `0px`;
}

/**
 * Attaches an event listener, and when the listener is
 * executed, it removes it immediately.
 *
 * @param {HTMLElement} element
 * @param {String} eventName
 * @param {Function} callback
 * @public
 */
function addEventListenerOnce(element, eventName, callback) {
  element.addEventListener(eventName, function handler(e) {
    run(() => {
      element.removeEventListener(eventName, handler);
      callback && callback(e);
    });
  });
}

export {
  CLASS_NAMES,
  setOpenHeight,
  setClosedHeight,
  addEventListenerOnce,
};
