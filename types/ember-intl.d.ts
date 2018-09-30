declare module 'ember-intl/services/intl' {
  import Service from '@ember/service'

  export default class IntlService extends Service {
    public locale: string[]

    public t(key: string, options?: object): string
    public setLocale(locale: string | any[]): void
    public addTranslations(locale: string, translations: {}): void
  }
}

declare module 'ember-intl/test-support' {
  export function setupIntl(hooks: any): void;
  export function setupIntl(hooks: any, locale?: string): void;
  export function setupIntl(hooks: any, translations?: {}): void;
  export function setupIntl(hooks: any, locale?: string, translations?: {}): void;
}
