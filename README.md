# ember-a11y-accordion

An ember accordion component that treats accessibility as a first class citizen. This addon is based on the [W3C's ARIA](https://www.w3.org/TR/wai-aria-practices/#accordion) best practices for accordions.

### Roles, States, Attributes, and Classes

<table>
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
      <td>Represents an accordion section, which contains the header and the panel. When expanded, it contains the additional <code>.a11y-accordion-item--is-expanded</code> class. When the <code>isDisabled</code> attribute is passed in and set to true, the component's element additionally contains the <code>.a11y-accordion-item--is-disabled</code> class.</td>
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
      <td>Set to true when the panel it controls is expanded, and set to false when the panel is collapsed. This ARIA attribute is also controlled by the optional <code>isDisabled</code> attribute that can be passed to accordion item components.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>&nbsp;</td>
      <td><code>section</code></td>
      <td><code>.a11y-accordion-panel-wrapper</code></td>
      <td>This is the accordion panel which the trigger controls. The <code>region</code> role is helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion. **Note** that you should never style this element.</td>
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
      <td><p>This is where the contents of the panel are rendered.</p><p>The panel content can be styled via CSS, however, note that when the <code>animation=true</code> attribute is passed to the <code>accordion-list</code> component, the content's height is calculated via JavaScript and it doesn't take into account the CSS <code>margin</code> property. With that said, only apply padding for styling purposes to the content element.</p></td>
    </tr>
  </tbody>
</table>

## Contribute

#### Install
* `git clone <repository-url>` this repository
* `cd ember-a11y-accordion`
* `npm install`

#### Running
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Running Tests
* `npm test` (Runs `ember try:each` to test the addon against multiple Ember versions)
* `ember test`
* `ember test --server`

#### Building
* `ember build`
