import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('accordion-list', 'Integration | Component | accordion list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#accordion-list}}
      template block text
    {{/accordion-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
