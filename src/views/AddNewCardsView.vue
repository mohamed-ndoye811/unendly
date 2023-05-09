<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

import {reactive, ref} from 'vue';
import {useStudyStore} from '../stores/study';
import {storeToRefs} from 'pinia';
import {useSettingsStore} from '../stores/settings';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import moment from 'moment'
import type {Card} from "@/types";
import Button from "@/components/ButtonComponent.vue";

dayjs.extend(localizedFormat)

const studyStore = useStudyStore();
const settingsStore = useSettingsStore();

const {allCards: cards, dailyCardsAdded, dailyStudiesComplete, lastStudiedDate} = storeToRefs(studyStore);
const {cardsPerDay, startDate, studyHour} = storeToRefs(settingsStore);
const newCards = ref([] as Card[]);

// Reset dailyStudiesComplete to be sure
if ((
    moment().diff(moment(lastStudiedDate.value, 'DD/MM/YYYY'), 'day')
    && (parseInt(moment().format('HH')) >= studyHour.value))) {
    dailyStudiesComplete.value = false;
}

import {cardDisappearingAnimation} from "@/utils/animations";

const initCardValues = {
    question: null,
    answer: null,
    category: null,
    theme: null,
    revealed: false,
    studied: false,
    dateOfStudy: moment().format('DD/MM/YYYY')
}

let initCardState = reactive(initCardValues);

const cardsToAdd = ref(Array(cardsPerDay.value as number - newCards.value.length).fill(initCardState));

function action(elSaved: string) {

    if (newCards.value.length == cardsPerDay.value) return;

    switch (elSaved) {
        case 'saveQuestion':
            // Make the card flip to edit the answer
            cardsToAdd.value = cardsToAdd.value.map(
                (card, index) => {
                    console.log(card, index)
                    if (index != cardsToAdd.value.length - 1) return card;

                    return {...card, revealed: !card.revealed}
                }
            );
            break;
        case 'saveAnswer':
            cardDisappearingAnimation(() => {
                // Save the card into the store
                cardsToAdd.value = cardsToAdd.value.map(
                    (card, index) => {
                        if (index != cardsToAdd.value.length - 1) return card;

                        return {...card, revealed: false}
                    }
                );
                newCards.value.push({
                    ...cardsToAdd.value.pop(),
                    level: 1,
                    id: cards.value.length + newCards.value.length + 1
                });

                if (newCards.value && (newCards.value.length == cardsPerDay.value)) {
                    cards.value = [...cards.value, ...newCards.value];
                    dailyCardsAdded.value = true;
                }

                if (!startDate.value) {
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    startDate.value = dayjs().add(1, 'day').format('L');
                }

                initCardState = initCardValues
            })

            break;
    }

}
</script>

<template>
    <main id="add-cards">
        <div class="card-deck" v-if="!dailyStudiesComplete">
            <CardComponent v-for="(card, index) in cardsToAdd"
                           v-bind:key="cards.filter(card => card).length + (cardsPerDay as number) - index"
                           mode="edit"
                           :id="(cardsPerDay as number) - index"
                           :revealed="card.revealed" :question="card.question" @questionUpdate="card.question = $event"
                           :answer="card.answer" @answerUpdate="card.answer = $event" :categ="card.categ"
                           @categUpdate="card.categ = $event" :theme="card.theme" @themeUpdate="card.theme = $event"/>
        </div>
        <div class="actions" v-if="!(newCards.length == cardsPerDay) && !dailyStudiesComplete">
            <ButtonComponent text="Save question" @click="action('saveQuestion')" v-if="!cardsToAdd.at(-1)?.revealed"/>
            <ButtonComponent text="Save Answer" @click="action('saveAnswer')" v-if="cardsToAdd.at(-1)?.revealed"/>
        </div>
        <div class="studies-finished" v-else-if="dailyStudiesComplete">
            <h2 v-if="studyHour > parseInt(moment().format('HH'))">You are early!! Come back at {{ studyHour }}h for
                your daily study session</h2>
            <h2 v-else>Studies finished! Come back tomorrow</h2>
            <Button text="Back to home page" link="/"/>
        </div>
        <div class="cards-added" v-else>
            <h2>New Cards added successfully</h2>
            <ButtonComponent text="Start the daily studies!" link="/study"/>
        </div>

    </main>
</template>