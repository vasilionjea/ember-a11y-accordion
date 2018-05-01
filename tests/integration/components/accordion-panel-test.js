import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';

const SELECTORS = {
  panel: `.${CLASS_NAMES.panel}`,
};

moduleForComponent('accordion-panel', 'Integration | Component | accordion panel', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.dom(SELECTORS.panel).exists({ count: 1 });
});
