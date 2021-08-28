import { module, test } from 'qunit';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

const SELECTORS = {
  header: `.${CLASS_NAMES.header}`,
};

module('Integration | Component | accordion-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{#accordion-list as |accordion|}}
        {{#accordion.item expandOnInit=true as |item|}}
          {{#item.header}}header here...{{/item.header}}
          {{#item.panel}}panel here...{{/item.panel}}
        {{/accordion.item}}
      {{/accordion-list}}
    `);

    assert.dom(SELECTORS.header).exists({ count: 1 });
  });
});
