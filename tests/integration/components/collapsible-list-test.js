import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';

moduleForComponent('collapsible-list', 'Integration | Component | collapsible list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  assert.equal(this.$(`.${CLASS_NAMES.list}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.item}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.header}`).length, 1);
  assert.equal(this.$(`.${CLASS_NAMES.panel}`).length, 1);
});

test('it has the aria-disabled attribute set to false when the item is expanded', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  // Elements
  const $header = this.$(`.${CLASS_NAMES.header}`);
  const $trigger = $header.find('button');

  assert.equal($trigger.attr('aria-disabled'), 'false', 'The trigger does not have an aria-disabled attribute');
});
