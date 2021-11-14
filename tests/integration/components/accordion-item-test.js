import { module, test } from 'qunit';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

const SELECTORS = {
  header: `.${CLASS_NAMES.header}`,
  trigger: `.${CLASS_NAMES.trigger}`,
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
};

module('Integration | Component | accordion-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it has ARIA and DOM attributes on init', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    // Header trigger
    const assertTrigger = assert.dom(SELECTORS.trigger);
    assertTrigger.hasAttribute(
      'type',
      'button',
      'The trigger is of type "button"'
    );
    assertTrigger.hasAttribute(
      'aria-expanded',
      'true',
      'The trigger has an aria-expanded value of "true" when expandOnInit is set to true'
    );
    assertTrigger.hasAttribute(
      'aria-disabled',
      'true',
      'The trigger has an aria-disabled value of "true" when expandOnInit is set to true'
    );
    assertTrigger.hasAttribute(
      'aria-controls',
      this.element.querySelector(SELECTORS.panelWrapper).getAttribute('id'),
      'The trigger controls the correct panel via aria-controls'
    );

    // Item panel
    const assertPanel = assert.dom(SELECTORS.panelWrapper);
    assertPanel.hasAttribute(
      'aria-hidden',
      'false',
      'The panel aria-hidden value is "false" when expandOnInit is set to true'
    );
    assertPanel.hasAttribute(
      'aria-labelledby',
      this.element.querySelector(SELECTORS.trigger).getAttribute('id'),
      'The panel is labelled by the correct trigger via aria-labelledby'
    );

    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });
});
