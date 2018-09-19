import { module, test } from 'qunit';
// necessary for TypeScript to find `assert.dom`
import 'qunit-dom';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | locale-chooser', function(hooks) {
  setupRenderingTest(hooks);

  const translations: {} = {
    nameLabel: "Name",
    numberLabel: "Number"
  };
  setupIntl(hooks, translations);

  test('it renders', async function(assert) {
    this.set('locale', ['en-NZ', 'mi', 'ar']);
    this.set('preferredLocale', 'mi');

    await render(hbs`{{locale-chooser locales=locales preferredLocale=preferredLocale}}`);

    assert.dom('option').hasValue('en-NZ');
    assert.dom('option:selected').hasValue('mi');
    assert.dom('option').hasValue('ar');
  });
});
