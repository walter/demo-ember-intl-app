import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import config from 'demo-intl/config/environment';

export default class ApplicationRoute extends Route {
  @service intl;

  async beforeModel() {
    let preferredLocale = localStorage.preferredLocale;
    let localesWithDefault = [config.defaultLocale];

    if (!preferredLocale) {
      preferredLocale = config.defaultLocale;
    } else {
      if (preferredLocale !== config.defaultLocale) {
        // specify array of locales to in order of precedence
        // lookup will then fallthrough to default locale if preferred locale doesn't have a translation
        // useful for legalese or if we only partially support a language
        localesWithDefault = [preferredLocale, config.defaultLocale];
      }
    }

    await this._loadTranslations(preferredLocale);

    return this.get('intl').setLocale(localesWithDefault);
  }

  async _loadTranslations(preferredLocale) {
    const remainingLocales = config.supportedLocales.slice().removeObject(preferredLocale);

    let translations = await fetch(`/translations/${preferredLocale}.json`).then(response => response.json());
    this.get('intl').addTranslations(preferredLocale, translations);

    remainingLocales.forEach(async (locale) => {
      translations = await fetch(`/translations/${locale}.json`).then(response => response.json());
      // dynamically add to translations for a locale/language - potential for optimization of payload
      this.get('intl').addTranslations(locale, translations);
    });
  }
}
