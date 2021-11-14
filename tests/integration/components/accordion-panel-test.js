import { module, test } from 'qunit';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

const SELECTORS = {
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
};

module('Integration | Component | accordion-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(hbs`
      {{#accordion-list as |accordion|}}
        {{#accordion.item expandOnInit=true as |item|}}
          {{#item.header}}header here...{{/item.header}}
          {{#item.panel}}panel here...{{/item.panel}}
        {{/accordion.item}}
      {{/accordion-list}}
    `);

    assert.dom(SELECTORS.panelWrapper).exists({ count: 1 });
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });
});
