import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {Card} from '@/types'
import {useSettingsStore} from './settings'
import moment from 'moment'

export const useStudyStore = defineStore('studies', {
    state: () => ({
        dailyCardsAdded: false,
        dailyStudiesComplete: false,
        cardsToStudy: [] as Card[],
        allCards: [] as Card[],
    }),
    getters: {},
    actions: {
        async setSettings(settings: any) {
            this.$state = settings
        },
        getStudyCards(level: number = 1) {
            return this.allCards.filter(card => {
                return card.level === level && !card.studied && card.dateOfStudy == moment().format('DD/MM/YYYY')
            })
        },
        resetStudyCardsState() {
            this.allCards.forEach((card) => {
                card.studied = false;
                card.revealed = false;
            })
        },
        getLevelsOfTheDay() {
            const levels: Set<number> = new Set([]);
            this.allCards.forEach((card) => {
                if (levels.has(card.level) || card.dateOfStudy != moment().format('DD/MM/YYYY')) return;
                levels.add(card.level)
            })

            return [...levels].sort((a, b) =>
                a <= b ? 1 : -1);
        }
    },
    persistedState: {
        persist: true,
        overwrite: true
    }
})
