import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import config from 'demo-intl/config/environment';

export default Controller.extend({
  intl: service(),

  preferredLocale: config.defaultLocale,
  name: '',
  number: 0,

  init() {
    this._super(...arguments);

    this.set('preferredLocale', localStorage.preferredLocale || config.defaultLocale);
    this._setLangAndDir(this.get('preferredLocale'));
  },

  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale([locale, config.defaultLocale]);

      this._setLangAndDir(locale);

      // persist user preference for locale
      localStorage.preferredLocale = locale;
    },

    updateName(name) {
      this.set('name', name);
    },

    updateNumber(number) {
      this.set('number', number);
    },
  },

  // update document lang and if ar change dir to rtf
  _setLangAndDir(locale) {
    document.documentElement.lang = locale;
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = '';
    }
  }
});
