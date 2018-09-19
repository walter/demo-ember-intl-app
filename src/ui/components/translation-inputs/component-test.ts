import { module, test } from 'qunit';
// necessary for TypeScript to find `assert.dom`
import 'qunit-dom';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | translation-inputs', function(hooks) {
  setupRenderingTest(hooks);

  const translations: {} = {
    nameLabel: "Name",
    numberLabel: "Number"
  };
  setupIntl(hooks, translations);

  test('it renders', async function(assert) {
    this.set('name', 'Bob Dobbs');
    this.set('numberValue', 0);

    await render(hbs`{{translation-inputs name=name number=numberValue}}`);

    assert.dom('label').hasText('Name');
    assert.dom('input.ember-test-field').hasValue('Bob Dobbs');
    assert.dom('label').hasText('Number');
    assert.dom('input.ember-test-field').hasValue('0');
  });
});
