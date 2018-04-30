import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/constants';

moduleForComponent('accordion-item', 'Integration | Component | accordion item', {
  integration: true,
});

test('(accordion) it renders', function(assert) {
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

test('(accordion) it has appropriate attributes on init', function(assert) {
  assert.expect(9);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  // Elements
  const $list = this.$(`.${CLASS_NAMES.list}`);
  const $header = this.$(`.${CLASS_NAMES.header}`);
  const $trigger = $header.find('button');
  const $panel = this.$(`.${CLASS_NAMES.panel}`);

  assert.equal($header.attr('role'), 'heading', 'The header has an ARIA role of "heading"');
  assert.equal($header.attr('aria-level'), '3', 'The header aria-level is 3 by default');
  assert.equal($trigger.attr('type'), 'button', 'The trigger is of type "button"');
  assert.equal($trigger.attr('aria-expanded'), 'true', 'The trigger aria-expanded value is "true" when expandOnInit is set to true');
  assert.equal($trigger.attr('aria-disabled'), 'true', 'The trigger aria-disabled value is "true" when expandOnInit is set to true');
  assert.equal($trigger.attr('aria-controls'), $panel.attr('id'), 'The trigger controls the correct panel via aria-controls');
  assert.equal($panel.attr('role'), 'region', 'The panel has an ARIA role of "region"');
  assert.equal($panel.attr('aria-hidden'), 'false', 'The panel aria-hidden value is "false" when expandOnInit is set to true');
  assert.equal($panel.attr('aria-labelledby'), $trigger.attr('id'), 'The panel is labelled by the correct trigger via aria-labelledby');
});

test('(collapsible) it has the aria-disabled attribute set to false when the item is expanded', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#accordion-list isCollapsible=true as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  // Elements
  const $header = this.$(`.${CLASS_NAMES.header}`);
  const $trigger = $header.find('button');

  assert.equal($trigger.attr('aria-disabled'), 'false', 'The trigger does not have an aria-disabled attribute');
});
