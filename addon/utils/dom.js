const CLASS_NAMES = {
  list: 'a11y-accordion-list',
  item: 'a11y-accordion-item',
  itemExpanded: 'a11y-accordion-item--is-expanded',
  itemDisabled: 'a11y-accordion-item--is-disabled',
  header: 'a11y-accordion-header',
  trigger: 'a11y-accordion-header__trigger',
  panel: 'a11y-accordion-panel',
};

/**
 * Calculates and set's an items open height.
 *
 * @param {Object} item
 * @public
 */
function setOpenHeight({ element, headerElement, panelElement }) {
  const header = headerElement.getBoundingClientRect();
  const panel = panelElement.getBoundingClientRect();
  element.style.height = `${(header.height + panel.height)}px`;
}

/**
 * Calculates and set's an items closed height.
 *
 * @param {Object} item
 * @public
 */
function setClosedHeight({ element, headerElement }) {
  const header = headerElement.getBoundingClientRect();
  element.style.height = `${header.height}px`;
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
  element.addEventListener(eventName, function onTransitionEnd(e) {
    element.removeEventListener(eventName, onTransitionEnd);
    callback && callback(e);
  });
}

export {
  CLASS_NAMES,
  setOpenHeight,
  setClosedHeight,
  addEventListenerOnce,
};
