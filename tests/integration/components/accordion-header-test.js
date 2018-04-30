import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/constants';

moduleForComponent('accordion-header', 'Integration | Component | accordion header', {
  integration: true,
});

test('(accordion) it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.equal(this.$(`.${CLASS_NAMES.header}`).length, 1);
});
