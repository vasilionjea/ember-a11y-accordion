# ember-a11y-accordion

An ember accordion component that treats accessibility as a first class citizen. This addon is based on the [W3C's ARIA](https://www.w3.org/TR/wai-aria-practices/#accordion) best practices for accordions.

## Roles, States, Attributes, and Classes

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
      <td>`div`</td>
      <td>`.a11y-accordion-list`</td>
      <td>Simply used as a container and doesn't have any semantic meaning.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>`section`</td>
      <td>
        `.a11y-accordion-item`<br>
        `.a11y-accordion-item--is-expanded`<br>
        `.a11y-accordion-item--is-disabled`
      </td>
      <td>Represents an accordion section, which contains the header and the panel. When expanded, it contains the additional `.a11y-accordion-item--is-expanded` class. When the `isDisabled` attribute is passed in and set to true, the component's element additionally contains the `.a11y-accordion-item--is-disabled` class.</td>
    </tr>
    <tr>
      <td>`heading`</td>
      <td>`aria-level="3"`</td>
      <td>`header`</td>
      <td>`.a11y-accordion-header`</td>
      <td>Represents an accordion item's heading. By default it acts as level 3 heading but it should be changed to whatever makes sense in a page's context.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`type="button"`</td>
      <td>`button`</td>
      <td>`.a11y-accordion-header__trigger`</td>
      <td>The button element is the only element inside the heading element and functions as the trigger for the accordion panel.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`aria-expanded="true"`</td>
      <td>`button`</td>
      <td>`.a11y-accordion-header__trigger`</td>
      <td>Set to true when the accordion panel is expanded, otherwise it's set to false.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`aria-controls="ID"`</td>
      <td>`button`</td>
      <td>`.a11y-accordion-header__trigger`</td>
      <td>Points to the panel ID, which the trigger controls.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`aria-disabled="true"`</td>
      <td>`button`</td>
      <td>`.a11y-accordion-header__trigger`</td>
      <td>Set to true when the panel it controls is expanded, and set to false when the panel is collapsed. This ARIA attribute is also controlled by the optional `isDisabled` attribute that can be passed to accordion item components.</td>
    </tr>
    <tr>
      <td>`region`</td>
      <td>&nbsp;</td>
      <td>`section`</td>
      <td>`.a11y-accordion-panel-wrapper`</td>
      <td>This is the accordion panel which the trigger controls. The `region` role is helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion. **Note** that you should never style this element.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`aria-labelledby="ID"`</td>
      <td>`section`</td>
      <td>`.a11y-accordion-panel-wrapper`</td>
      <td>Points to the associated trigger element, which labels this panel region.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>`aria-hidden="true"`</td>
      <td>`section`</td>
      <td>`.a11y-accordion-panel-wrapper`</td>
      <td>Set to true when the panel is collapsed, otherwise it's set to false. This ARIA attribute is important when accordion items are visually hidden due to animation.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>`div`</td>
      <td>`.a11y-accordion-panel-content`</td>
      <td><p>This is where the contents of the panel are rendered.</p><p>The panel content can be styled via CSS, however, note that when the `animation=true` attribute is passed to the `accordion-list` component, the content's height is calculated via JavaScript and it doesn't take into account the CSS `margin` property. With that said, only apply padding for styling purposes to the content element.</p></td>
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
