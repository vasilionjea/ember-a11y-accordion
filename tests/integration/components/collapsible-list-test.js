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
  panel: `.${CLASS_NAMES.panel}`,
};

moduleForComponent('collapsible-list', 'Integration | Component | collapsible list', {
  integration: true,
});

test('it should render', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item as |item|}}
        {{#item.header}}Header title{{/item.header}}
        {{#item.panel}}Panel contents{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  assert.dom(SELECTORS.list).exists({ count: 1 });
  assert.dom(SELECTORS.item).exists({ count: 1 });
  assert.dom(SELECTORS.header).exists({ count: 1 });
  assert.dom(SELECTORS.panel).exists({ count: 1 });
});

test('it should render items in the expanded state when "expandOnInit" is set to true', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item expandOnInit=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
});

test('it should render items in the disabled state when "isDisabled" is set to true', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item isDisabled=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/collapsible.item}}

      {{#collapsible.item as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/collapsible.item}}

      {{#collapsible.item isDisabled=true as |item|}}
        {{#item.header}}First header{{/item.header}}
        {{#item.panel}}First panel{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  assert.dom(SELECTORS.itemDisabled).exists({ count: 2 });
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemDisabled);
});

test('it should expand the item when its header is clicked', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#collapsible-list as |collapsible|}}
      {{#collapsible.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}

      {{#collapsible.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}

      {{#collapsible.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  // Click the first item's header
  click(find(SELECTORS.header));

  // Item is expanded
  assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

  // Now there are two that are expanded
  assert.dom(SELECTORS.itemExpanded).exists({ count: 2 });
});

test('it should execute the onShow action when one is provided', function(assert) {
  assert.expect(1);

  this.set('doSomethingOnShow', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#collapsible-list onShow=(action doSomethingOnShow) as |collapsible|}}
      {{#collapsible.item as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  click(SELECTORS.header);
});

test('it should execute the onHide action when one is provided', function(assert) {
  assert.expect(1);

  this.set('doSomethingOnHide', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#collapsible-list onHide=(action doSomethingOnHide) as |collapsible|}}
      {{#collapsible.item expandOnInit=true as |item|}}
        {{#item.header}}header here...{{/item.header}}
        {{#item.panel}}panel here...{{/item.panel}}
      {{/collapsible.item}}
    {{/collapsible-list}}
  `);

  click(SELECTORS.header);
});
