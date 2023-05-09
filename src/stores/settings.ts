import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: (): {
    studyHour: Number
    cardsPerDay: Number
    startDate: String | null
  } => ({
    studyHour: 8,
    cardsPerDay: 10,
    startDate: null
  }),
  getters: {},
  actions: {
    async setSettings(settings: any) {
      this.$state = settings
    }
  },
  persistedState: {
    persist: true,
    overwrite: true
  }
})
