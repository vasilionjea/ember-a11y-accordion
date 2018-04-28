import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/constants';

moduleForComponent('accordion-item', 'Integration | Component | accordion item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.equal(this.$(`.${CLASS_NAMES.list}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.item}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.header}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.panel}`).length, 1);
});
