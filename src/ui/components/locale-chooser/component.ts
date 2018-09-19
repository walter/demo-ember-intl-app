import Component from '@ember/component';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import IntlService from 'ember-intl/services/intl';
import config from 'demo-intl/config/environment';

export default class LocaleChooser extends Component {
  @service intl!: IntlService;

  preferredLocale: string = config.defaultLocale;
  // passed in action, default does nothing
  onLocaleChange = (locale: string) => locale;

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('preferredLocale', localStorage.preferredLocale || config.defaultLocale);
    this.onLocaleChange(this.get('preferredLocale'));
  }

  @action
  changeLocale(locale: string) {
    this.get('intl').setLocale([locale, config.defaultLocale,]);

    this.onLocaleChange(locale);
  }
}
