import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import IntlService from 'ember-intl/services/intl';
import config from '../../../../config/environment';

export default class extends Controller {
  @service intl!: IntlService;

  // new fields syntax
  preferredLocale: string = config.defaultLocale;
  name: string = '';
  numberValue: number = 0;

  init() {
    this._super(...arguments);

    this.set('preferredLocale', localStorage.preferredLocale || config.defaultLocale);
    this._setLangAndDir(this.get('preferredLocale'));
  }

  @action
  changeLocale(locale: string) {
    this.get('intl').setLocale([locale, config.defaultLocale,]);

    this._setLangAndDir(locale);

    // persist user preference for locale
    localStorage.preferredLocale = locale;
  }

  @action
  updateName(name: string) {
    this.set('name', name);
  }

  @action
  updateNumber(numberValue: number) {
    this.set('numberValue', numberValue);
  }

  // update document lang and if ar change dir to rtf
  _setLangAndDir(locale: string) {
    document.documentElement.lang = locale;
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = '';
    }
  }
}
