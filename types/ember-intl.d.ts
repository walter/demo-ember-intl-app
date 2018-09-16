declare module 'ember-intl/services/intl' {
  import Service from '@ember/service'

  export default class IntlService extends Service {
    public locale: string[]

    public t(key: string, options?: object): string
    public setLocale(locale: string | any[]): void
    public addTranslations(locale: string, translations: {}): void
  }
}
