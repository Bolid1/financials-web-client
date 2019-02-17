import { action, computed, observable } from 'mobx'

const defaultLang = 'ru'

export default class LanguageStore {
  static supportedLanguages = ['ru', 'en']

  /**
   * @type {string}
   * @private
   */
  @observable _lang

  /**
   * @returns {string}
   */
  @computed get lang () {
    return this._lang || defaultLang
  }

  /**
   * @returns {Object.<string, string>[]}
   */
  @computed get messages () {
    return require('../translations/' + this.lang)
  }

  /**
   * @param {string} lang
   * @returns {void}
   */
  @action.bound setLang (lang) {
    if (LanguageStore.supportedLanguages.indexOf(lang) === -1) {
      throw new Error(`Unsupported language "${lang}"`)
    }

    this._lang = lang
  }
}
