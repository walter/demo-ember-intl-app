import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import config from 'demo-intl/config/environment';

export default class extends Controller {
  @service intl;

  // new fields syntax
  preferredLocale = config.defaultLocale;
  name = '';
  number =  0;

  init() {
    this._super(...arguments);

    this.set('preferredLocale', localStorage.preferredLocale || config.defaultLocale);
    this._setLangAndDir(this.get('preferredLocale'));
  }

  @action
  changeLocale(locale) {
    this.get('intl').setLocale([locale, config.defaultLocale]);

    this._setLangAndDir(locale);

    // persist user preference for locale
    localStorage.preferredLocale = locale;
  }

  @action
  updateName(name) {
    this.set('name', name);
  }

  @action
  updateNumber(number) {
    this.set('number', number);
  }

  // update document lang and if ar change dir to rtf
  _setLangAndDir(locale) {
    document.documentElement.lang = locale;
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = '';
    }
  }
}
