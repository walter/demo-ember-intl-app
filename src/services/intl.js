import IntlService from 'ember-intl/services/intl';

export default class EmberClearIntl extends IntlService.extend({
  async loadTranslations(locale) {
    let response = await fetch(`/translations/${locale}.json`);
    let translations = await response.json();
    this.addTranslations(locale, translations);
  },

  lookup(key, localeName, options = {}) {
    const localeNames = this.localeWithDefault(localeName);
    const translation = this._adapter.lookup(localeNames, key);

    if (!options.resilient && translation === undefined) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, [localeNames]);
    }

    return translation;
  },
}) { }
