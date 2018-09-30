import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import IntlService from 'ember-intl/services/intl';

export default class extends Controller {
  @service intl!: IntlService;

  // new fields syntax
  name: string = '';
  numberValue: number = 0;

  @action
  updateName(name: string) {
    this.set('name', name);
  }

  @action
  updateNumber(numberValue: number) {
    this.set('numberValue', numberValue);
  }

  @action
  onLocaleChange(locale: string) {
    this._setLangAndDir(locale);

    // persist user preference for locale
    localStorage.preferredLocale = locale;
  }

  // update document lang and if ar change dir to rtf
  // perhaps should be done with passed in action
  _setLangAndDir(locale: string) {
    document.documentElement.lang = locale;
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = '';
    }
  }
}
