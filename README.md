# ember-a11y-accordion
[![Build Status](https://github.com/ryanone/ember-a11y-accordion/actions?query=workflow%3ACI)](https://github.com/ryanone/ember-a11y-accordion/actions?query=workflow%3ACI)

This Ember addon is based on the [W3C's ARIA](https://www.w3.org/TR/wai-aria-practices/#accordion) best practices for accordions and treats accessibility as a first class citizen. Live demo: https://vasilionjea.github.io/ember-a11y-accordion/

## Install
```
ember install ember-a11y-accordion
```


## Usage
```mustache
<AccordionList
  @animation={{false}}
  @onAfterShow={{this.onAfterShow}}
  @onShow={{this.onAccordionShow}}
  class="my-accordion" as |accordion|>
  <accordion.item @expandOnInit={{true}} @name="item1" as |item|>
    <item.header @ariaLevel="4" class="first-header">Lorem ipsum</item.header>
    <item.panel class="first-panel">
      <p>Lorem <a href="#">ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </item.panel>
  </accordion.item>
  <accordion.item @name="item2" as |item|>
    <item.header @ariaLevel="4">Dolor Sit</item.header>
    <item.panel>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </item.header>
  </accordion.item>
  <accordion.item @isDisabled={{true}} as |item|>
    <item.header @ariaLevel="4">This is disabled</item.header>
    <item.panel>
      <p>User cannot interact with this item.</p>
    </item.header>
  </accordion.item>
</AccordionList>
```

There is an additional collapsible component called `collapsible-list` and all the options are exactly the same as the accordion list component. The only difference is that accordions expand one item at a time, whereas collapsibles can have multiple items expanded at any point in time. 

Both the `accordion-list` and the `collapsible-list` components accept the following actions:
- `onShow` Triggered when the header is clicked.
- `onAfterShow` Triggered once the content is visible and all animations completed. Without animation, it triggers after the _onShow_ action.

The `collapsible-list` component additionally accepts the following actions:
- `onHide` Triggered when the header is clicked and the panel is closing.

`onHide`, `onShow` and `onAfterShow` will receive an object as first argument with a name property containing the `name` of the `accordion-item` becoming visible and other properties.

## Roles, States, Attributes, and Classes

<table>
  <col style="">
  <col style="width:20%">
  <col style="">
  <col style="width:33%">
  <col style="width:43%">
  <thead>
    <tr>
      <th>Role</th>
      <th>Attribute</th>
      <th>Element</th>
      <th>Classes</th>
      <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td><code>div</code></td>
      <td><code>.a11y-accordion-list</code></td>
      <td>Simply used as a container and doesn't have any semantic meaning.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td><code>section</code></td>
      <td>
        <code>.a11y-accordion-item</code><br>
        <code>.a11y-accordion-item--is-expanded</code><br>
        <code>.a11y-accordion-item--is-disabled</code>
      </td>
      <td>Represents an accordion section, which contains the header and the panel. When expanded, it contains the additional <code>.a11y-accordion-item--is-expanded</code> class. When the <code>@isDisabled</code> attribute is passed in and set to true, the component's element additionally contains the <code>.a11y-accordion-item--is-disabled</code> class.</td>
    </tr>
    <tr>
      <td><code>heading</code></td>
      <td><code>aria-level="3"</code></td>
      <td><code>header</code></td>
      <td><code>.a11y-accordion-header</code></td>
      <td>Represents an accordion item's heading. By default it acts as level 3 heading but it should be changed to whatever makes sense in a page's context.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>type="button"</code></td>
      <td><code>button</code></td>
      <td><code>.a11y-accordion-header__trigger</code></td>
      <td>The button element is the only element inside the heading element and functions as the trigger for the accordion panel.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>aria-expanded="true"</code></td>
      <td><code>button</code></td>
      <td><code>.a11y-accordion-header__trigger</code></td>
      <td>Set to true when the accordion panel is expanded, otherwise it's set to false.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>aria-controls="ID"</code></td>
      <td><code>button</code></td>
      <td><code>.a11y-accordion-header__trigger</code></td>
      <td>Points to the panel ID, which the trigger controls.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>aria-disabled="true"</code></td>
      <td><code>button</code></td>
      <td><code>.a11y-accordion-header__trigger</code></td>
      <td>Set to true when the panel it controls is expanded, and set to false when the panel is collapsed. This ARIA attribute is also controlled by the optional <code>@isDisabled</code> attribute that can be passed to accordion item components.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>&nbsp;</td>
      <td><code>section</code></td>
      <td><code>.a11y-accordion-panel-wrapper</code></td>
      <td><p>This is the accordion panel which the trigger controls. The <code>region</code> role is helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion.</p><p><strong>Note</strong> that you should never style this element.</p></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>aria-labelledby="ID"</code></td>
      <td><code>section</code></td>
      <td><code>.a11y-accordion-panel-wrapper</code></td>
      <td>Points to the associated trigger element, which labels this panel region.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><code>aria-hidden="true"</code></td>
      <td><code>section</code></td>
      <td><code>.a11y-accordion-panel-wrapper</code></td>
      <td>Set to true when the panel is collapsed, otherwise it's set to false. This ARIA attribute is important when accordion items are visually hidden due to animation.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td><code>div</code></td>
      <td><code>.a11y-accordion-panel-content</code></td>
      <td><p>This is where the contents of the panel are rendered.</p><p>The panel content can be styled via CSS, however, note that when the <code>@animation={{true}}</code> attribute is passed to the <code>accordion-list</code> component, the content's height is calculated via JavaScript and it doesn't take into account the CSS <code>margin</code> property. With that said, only apply padding for styling purposes to the content element.</p></td>
    </tr>
  </tbody>
</table>


## Contribute
See the [Contributing](CONTRIBUTING.md) guide for details.

### Install
* `git clone <repository-url>` this repository
* `cd ember-a11y-accordion`
* `npm install`

### Running
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests
* `npm test` (Runs `ember try:each` to test the addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building
* `ember build`

## License
This project is licensed under the [MIT License](LICENSE.md).
