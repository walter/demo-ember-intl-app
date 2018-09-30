import { module, test } from 'qunit';
// necessary for TypeScript to find `assert.dom`
import 'qunit-dom';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | render-text', function(hooks) {
  setupRenderingTest(hooks);

  const translations: {} = {
    someText: "Hey {name}, {number, plural, =0 {nothing} =1 {one thing} other {# things}}."
  };
  setupIntl(hooks, translations);

  test('it renders', async function(assert) {
    this.set('name', 'Bob Dobbs');
    this.set('numberValue', 0);

    await render(hbs`{{render-text name=name number=numberValue}}`);

    assert.dom('.ember-view').hasText('Hey Bob Dobbs, nothing');
  });
});
