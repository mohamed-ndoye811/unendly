import { defineStore } from 'pinia'
import type {Card} from "@/types";

export const useNewCardsStore = defineStore('newCards', {
  state: () => ({
    newCards: [] as Card[],
  }),
  getters: {},
  actions: {},
  persistedState: {
    persist: true,
    overwrite: true
  }
})
