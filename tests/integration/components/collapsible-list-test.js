import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';

const SELECTORS = {
  list: `.${CLASS_NAMES.list}`,
  item: `.${CLASS_NAMES.item}`,
  itemExpanded: `.${CLASS_NAMES.itemExpanded}`,
  itemDisabled: `.${CLASS_NAMES.itemDisabled}`,
  header: `.${CLASS_NAMES.header}`,
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
  trigger: `.${CLASS_NAMES.trigger}`,
};

module('Integration | Component | collapsible-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <CollapsibleList as |collapsible|>
        <collapsible.item as |item|>
          <item.header>Header title</item.header>
          <item.panel>Panel contents</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    assert.dom(SELECTORS.list).exists({ count: 1 });
    assert.dom(SELECTORS.item).exists({ count: 1 });
    assert.dom(SELECTORS.header).exists({ count: 1 });
    assert.dom(SELECTORS.panelWrapper).exists({ count: 1 });
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should render items in the expanded state when "expandOnInit" is set to true', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <CollapsibleList as |collapsible|>
        <collapsible.item @expandOnInit={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should render items in the expanded state when "expandOnInit" is set to true and animation is set to false', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <CollapsibleList @animation={{false}} as |collapsible|>
        <collapsible.item @expandOnInit={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should render items in the disabled state when "isDisabled" is set to true', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <CollapsibleList as |collapsible|>
        <collapsible.item @isDisabled={{true}} as |item|>
          <item.header>first header</item.header>
          <item.panel>first panel</item.panel>
        </collapsible.item>

        <collapsible.item as |item|>
          <item.header>second header</item.header>
          <item.panel>second panel</item.panel>
        </collapsible.item>

        <collapsible.item @isDisabled={{true}} as |item|>
          <item.header>third header</item.header>
          <item.panel>third panel</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    assert.dom(SELECTORS.itemDisabled).exists({ count: 2 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemDisabled);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should expand the item when its trigger is clicked', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <CollapsibleList as |collapsible|>
        <collapsible.item as |item|>
          <item.header>first header here...</item.header>
          <item.panel>first panel here...</item.panel>
        </collapsible.item>

        <collapsible.item @expandOnInit={{true}} as |item|>
          <item.header>second header here...</item.header>
          <item.panel>second panel here...</item.panel>
        </collapsible.item>

        <collapsible.item as |item|>
          <item.header>third header here...</item.header>
          <item.panel>third panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    // Click the first item's trigger
    await click(this.element.querySelector(SELECTORS.trigger));

    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Now there are two that are expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 2 });

    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should expand the item when its trigger is clicked and animation is set to false', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <CollapsibleList @animation={{false}} as |collapsible|>
        <collapsible.item as |item|>
          <item.header>first header here...</item.header>
          <item.panel>first panel here...</item.panel>
        </collapsible.item>

        <collapsible.item @expandOnInit={{true}} as |item|>
          <item.header>second header here...</item.header>
          <item.panel>second panel here...</item.panel>
        </collapsible.item>

        <collapsible.item as |item|>
          <item.header>third header here...</item.header>
          <item.panel>third panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    // Click the first item's trigger
    await click(this.element.querySelector(SELECTORS.trigger));

    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Now there are two that are expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 2 });

    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow action when one is provided', async function (assert) {
    assert.expect(3);

    this.set('doSomethingOnShow', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <CollapsibleList @onShow={{this.doSomethingOnShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(3);

    this.set('doSomethingOnShow', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <CollapsibleList @animation={{false}} @onShow={{this.doSomethingOnShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onAfterShow action when one is provided', async function (assert) {
    assert.expect(3);

    const done = assert.async();

    this.set('doSomethingOnAfterShow', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
      done();
    });

    await render(hbs`
      <CollapsibleList @onAfterShow={{this.doSomethingOnAfterShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onAfterShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(3);

    this.set('doSomethingOnAfterShow', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <CollapsibleList @animation={{false}} @onAfterShow={{this.doSomethingOnAfterShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow and onAfterShow actions in the right order', async function (assert) {
    assert.expect(7);

    const done = assert.async();
    let doSomethingOnShowCalled = false;
    let doSomethingOnAfterShowCalled = false;

    this.set('doSomethingOnShow', (item) => {
      doSomethingOnShowCalled = true;
      assert.ok(true);
      assert.notOk(doSomethingOnAfterShowCalled);
      assert.strictEqual(item.name, 'item1');
    });

    this.set('doSomethingOnAfterShow', (item) => {
      doSomethingOnAfterShowCalled = true;
      assert.ok(true);
      assert.ok(doSomethingOnShowCalled);
      assert.strictEqual(item.name, 'item1');
      done();
    });

    await render(hbs`
      <CollapsibleList @onShow={{this.doSomethingOnShow}} @onAfterShow={{this.doSomethingOnAfterShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow and onAfterShow actions in the right order when animation is set to false', async function (assert) {
    assert.expect(7);

    const done = assert.async();

    let doSomethingOnShowCalled = false;
    let doSomethingOnAfterShowCalled = false;

    this.set('doSomethingOnShow', (item) => {
      doSomethingOnShowCalled = true;
      assert.ok(true);
      assert.notOk(doSomethingOnAfterShowCalled);
      assert.strictEqual(item.name, 'item1');
    });

    this.set('doSomethingOnAfterShow', (item) => {
      doSomethingOnAfterShowCalled = true;
      assert.ok(true);
      assert.ok(doSomethingOnShowCalled);
      assert.strictEqual(item.name, 'item1');
      done();
    });

    await render(hbs`
      <CollapsibleList @animation={{false}} @onShow={{this.doSomethingOnShow}} @onAfterShow={{this.doSomethingOnAfterShow}} as |collapsible|>
        <collapsible.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onHide action when one is provided', async function (assert) {
    assert.expect(3);

    this.set('doSomethingOnHide', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <CollapsibleList @onHide={{this.doSomethingOnHide}} as |collapsible|>
        <collapsible.item @name="item1" @expandOnInit={{true}} as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onHide action when one is provided and animation is set to false', async function (assert) {
    assert.expect(3);

    this.set('doSomethingOnHide', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <CollapsibleList @animation={{false}} @onHide={{this.doSomethingOnHide}} as |collapsible|>
        <collapsible.item @name="item1" @expandOnInit={{true}} as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </collapsible.item>
      </CollapsibleList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });
});
