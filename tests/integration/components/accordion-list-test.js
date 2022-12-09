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

module('Integration | Component | accordion-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
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
      <AccordionList as |accordion|>
        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should render items in the expanded state when "expandOnInit" is set to true and animation is set to false', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <AccordionList @animation={{false}} as |accordion|>
        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should render items in the disabled state when "isDisabled" is set to true', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item @isDisabled={{true}} as |item|>
          <item.header>first header</item.header>
          <item.panel>first panel</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>second header</item.header>
          <item.panel>second panel</item.panel>
        </accordion.item>

        <accordion.item @isDisabled={{true}} as |item|>
          <item.header>third header</item.header>
          <item.panel>third panel</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    assert.dom(SELECTORS.itemDisabled).exists({ count: 2 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemDisabled);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should expand the item when its trigger is clicked', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item as |item|>
          <item.header>first header here...</item.header>
          <item.panel>second panel here...</item.panel>
        </accordion.item>

        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>second header here...</item.header>
          <item.panel>second panel here...</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>third header here...</item.header>
          <item.panel>third panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    // Click the first item's trigger
    await click(this.element.querySelector(SELECTORS.trigger));
    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Only one is expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });

    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should expand the item when its trigger is clicked and animation is set to false', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <AccordionList @animation={{false}} as |accordion|>
        <accordion.item as |item|>
          <item.header>first header here...</item.header>
          <item.panel>first panel here...</item.panel>
        </accordion.item>

        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>second header here...</item.header>
          <item.panel>second panel here...</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>third header here...</item.header>
          <item.panel>third panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    // Click the first item's header
    await click(this.element.querySelector(SELECTORS.trigger));

    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Only one is expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });

    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow action when one is provided', async function (assert) {
    assert.expect(3);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @onShow={{this.doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(3);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @animation={{false}} @onShow={{this.doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onAfterShow action when one is provided', async function (assert) {
    assert.expect(3);

    const done = assert.async();

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
      done();
    });

    await render(hbs`
      <AccordionList @onAfterShow={{this.doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });

  test('it should execute the onAfterShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(3);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.strictEqual(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @animation={{false}} @onAfterShow={{this.doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
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
      <AccordionList @onShow={{this.doSomethingOnShow}} @onAfterShow={{this.doSomethingOnAfterShow}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
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
      <AccordionList @animation={{false}} @onShow={{this.doSomethingOnShow}} @onAfterShow={{this.doSomethingOnAfterShow}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.trigger);
    await a11yAudit(this.element);
    assert.ok(true, 'no a11y errors found!');
  });
});
