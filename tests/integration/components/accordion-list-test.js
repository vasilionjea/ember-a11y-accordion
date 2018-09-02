import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';

const SELECTORS = {
  list: `.${CLASS_NAMES.list}`,
  item: `.${CLASS_NAMES.item}`,
  itemExpanded: `.${CLASS_NAMES.itemExpanded}`,
  itemDisabled: `.${CLASS_NAMES.itemDisabled}`,
  header: `.${CLASS_NAMES.header}`,
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
};

moduleForComponent('accordion-list', 'Integration | Component | accordion list', {
  integration: true,
});

test('it should render', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.dom(SELECTORS.list).exists({ count: 1 });
  assert.dom(SELECTORS.item).exists({ count: 1 });
  assert.dom(SELECTORS.header).exists({ count: 1 });
  assert.dom(SELECTORS.panelWrapper).exists({ count: 1 });
});

test('it should render items in the expanded state when "expandOnInit" is set to true', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
});

test('it should render items in the expanded state when "expandOnInit" is set to true and animation is set to false', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#accordion-list animation=false as |accordion|}}
      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
});

test('it should render items in the disabled state when "isDisabled" is set to true', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item isDisabled=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item isDisabled=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.dom(SELECTORS.itemDisabled).exists({ count: 2 });
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemDisabled);
});

test('it should expand the item when its header is clicked', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  // Click the first item's header
  return click(find(SELECTORS.header)).then(() => {
    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Only one is expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  });
});

test('it should expand the item when its header is clicked and animation is set to false', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#accordion-list animation=false as |accordion|}}
      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}

      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  // Click the first item's header
  click(find(SELECTORS.header));

  // Item is expanded
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

  // Only one is expanded
  assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
});

test('it should execute the onShow action when one is provided', function(assert) {
  assert.expect(1);

  this.set('doSomething', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#accordion-list onShow=(action doSomething) as |accordion|}}
      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  click(SELECTORS.header);
});

test('it should execute the onShow action when one is provided and animation is set to false', function(assert) {
  assert.expect(1);

  this.set('doSomething', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#accordion-list animation=false onShow=(action doSomething) as |accordion|}}
      {{#accordion.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  click(SELECTORS.header);
});
