import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { CLASS_NAMES } from 'ember-a11y-accordion/utils/dom';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';

const SELECTORS = {
  list: `.${CLASS_NAMES.list}`,
  item: `.${CLASS_NAMES.item}`,
  itemExpanded: `.${CLASS_NAMES.itemExpanded}`,
  itemDisabled: `.${CLASS_NAMES.itemDisabled}`,
  header: `.${CLASS_NAMES.header}`,
  panelWrapper: `.${CLASS_NAMES.panelWrapper}`,
};

module('Integration | Component | accordion-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render', async function (assert) {
    assert.expect(4);

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
  });

  test('it should render items in the expanded state when "expandOnInit" is set to true', async function(assert) {
    assert.expect(2);

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
  });

  test('it should render items in the expanded state when "expandOnInit" is set to true and animation is set to false', async function (assert) {
    assert.expect(2);

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
  });

  test('it should render items in the disabled state when "isDisabled" is set to true', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item @isDisabled={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>

        <accordion.item @isDisabled={{true}} as |item|>
          <item.header>First header</item.header>
          <item.panel>First panel</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    assert.dom(SELECTORS.itemDisabled).exists({ count: 2 });
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemDisabled);
  });

  test('it should expand the item when its header is clicked', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <AccordionList as |accordion|>
        <accordion.item as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>

        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    // Click the first item's header
    await click(this.element.querySelector(SELECTORS.header));
    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Only one is expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  });

  test('it should expand the item when its header is clicked and animation is set to false', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <AccordionList @animation={{false}} as |accordion|>
        <accordion.item as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>

        <accordion.item @expandOnInit={{true}} as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>

        <accordion.item as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    // Click the first item's header
    await click(this.element.querySelector(SELECTORS.header));

    // Item is expanded
    assert.dom(SELECTORS.item).hasClass(CLASS_NAMES.itemExpanded);

    // Only one is expanded
    assert.dom(SELECTORS.itemExpanded).exists({ count: 1 });
  });

  test('it should execute the onShow action when one is provided', async function (assert) {
    assert.expect(2);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.equal(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @onShow={{fn doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });

  test('it should execute the onShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(2);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.equal(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @animation={{false}} @onShow={{fn doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });

  test('it should execute the onAfterShow action when one is provided', async function (assert) {
    assert.expect(2);

    const done = assert.async();

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.equal(item.name, 'item1');
      done();
    });

    await render(hbs`
      <AccordionList @onAfterShow={{fn doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });

  test('it should execute the onAfterShow action when one is provided and animation is set to false', async function (assert) {
    assert.expect(2);

    this.set('doSomething', (item) => {
      assert.ok(true);
      assert.equal(item.name, 'item1');
    });

    await render(hbs`
      <AccordionList @animation={{false}} @onAfterShow={{fn doSomething}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });

  test('it should execute the onShow and onAfterShow actions in the right order', async function (assert) {
    assert.expect(6);

    const done = assert.async();
    let doSomethingOnShowCalled = false;
    let doSomethingOnAfterShowCalled = false;

    this.set('doSomethingOnShow', (item) => {
      doSomethingOnShowCalled = true;
      assert.ok(true);
      assert.notOk(doSomethingOnAfterShowCalled);
      assert.equal(item.name, 'item1');
    });

    this.set('doSomethingOnAfterShow', (item) => {
      doSomethingOnAfterShowCalled = true;
      assert.ok(true);
      assert.ok(doSomethingOnShowCalled);
      assert.equal(item.name, 'item1');
      done();
    });

    await render(hbs`
      <AccordionList @onShow={{fn doSomethingOnShow}} @onAfterShow={{fn doSomethingOnAfterShow}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });

  test('it should execute the onShow and onAfterShow actions in the right order when animation is set to false', async function (assert) {
    assert.expect(6);

    const done = assert.async();

    let doSomethingOnShowCalled = false;
    let doSomethingOnAfterShowCalled = false;

    this.set('doSomethingOnShow', (item) => {
      doSomethingOnShowCalled = true;
      assert.ok(true);
      assert.notOk(doSomethingOnAfterShowCalled);
      assert.equal(item.name, 'item1');
    });

    this.set('doSomethingOnAfterShow', (item) => {
      doSomethingOnAfterShowCalled = true;
      assert.ok(true);
      assert.ok(doSomethingOnShowCalled);
      assert.equal(item.name, 'item1');
      done();
    });

    await render(hbs`
      <AccordionList @animation={{false}} @onShow={{fn doSomethingOnShow}} @onAfterShow={{fn doSomethingOnAfterShow}} as |accordion|>
        <accordion.item @name="item1" as |item|>
          <item.header>header here...</item.header>
          <item.panel>panel here...</item.panel>
        </accordion.item>
      </AccordionList>
    `);

    await click(SELECTORS.header);
  });
});
