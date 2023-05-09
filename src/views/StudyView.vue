<script setup lang="ts">
import Button from '@/components/ButtonComponent.vue';
import CardComponent from '@/components/CardComponent.vue';

import {ref, onMounted} from 'vue';
import {useStudyStore} from '../stores/study';
import {storeToRefs} from 'pinia';
import type {Card} from '@/types';
import {useSettingsStore} from "@/stores/settings";
import moment from "moment";
import anime from "animejs";
import gsap from 'gsap';

const studyStore = useStudyStore();
const settingsStore = useSettingsStore();

const {allCards, dailyStudiesComplete, lastStudiedDate} = storeToRefs(studyStore);
const {studyHour} = storeToRefs(settingsStore);

const cardsRef = ref([] as Card[]);
const levelToStudyIndex = ref(0 as number);
const levelsOfTheDay = studyStore.getLevelsOfTheDay();
const cards = ref(studyStore.getStudyCards(levelsOfTheDay[levelToStudyIndex.value]) as Card[]);
const transition = ref(true);
const studyAllowed = parseInt(moment().format('HH')) >= studyHour.value;

function handleCardClick(element: Card) {
    if (!cards.value?.at(-1)?.revealed) element.revealed = !element.revealed;
}

function handleResultButtonClick(card: Card, remembered: Boolean) {
    let cardToChange = allCards.value.find(card => card.id == cards.value.at(-1)?.id) as Card;
    // cardToChange.level = remembered ? cardToChange?.level + 1 : 1;
    // cardToChange.studied = true;
    // cardToChange.dateOfStudy = moment().add(2 ** (cardToChange.level - 1), 'days').format('DD/MM/YYYY')

    cardDisappearingAnimation(() => {
        cards.value.pop();

        if (cards.value.length == 0 && levelToStudyIndex.value < levelsOfTheDay.length - 1) {
            transitionAnimation();
            levelToStudyIndex.value++;
            cards.value = studyStore.getStudyCards(levelsOfTheDay[levelToStudyIndex.value]);
        } else if (cards.value.length == 0 && levelToStudyIndex.value >= levelsOfTheDay.length - 1) {
            dailyStudiesComplete.value = true;
            lastStudiedDate.value = moment().format('DD/MM/YYYY')
            studyStore.resetStudyCardsState();
        }
    })


    // if (cards.value.filter((card) => card.level == levelsOfTheDay[levelToStudyIndex.value]).length == 0 && levelToStudyIndex.value < levelsOfTheDay.length) {
    //     transitionAnimation();
    //     const hasCards = handleLevels(levelsOfTheDay[++levelToStudyIndex.value]);
    //     if (!hasCards) {
    //         studyStore.resetStudyCardsState()
    //     }
    // }
}

function handleLevels(level: number = levelsOfTheDay[levelToStudyIndex.value]): boolean {
    cards.value = studyStore.getStudyCards(levelsOfTheDay[levelToStudyIndex.value]) ?? [];
    return cards.value.length > 0;
}

function transitionAnimation() {
    let animation = anime.timeline({
        duration: 800,
        easing: "easeInOutCubic",
    });


    animation.add({
        targets: ".card-deck",
        opacity: [0, 0],
    })

    animation.add({
        targets: '.level-annoucement-transition span',
        top: [32, 0],
        opacity: [0, 1],
        duration: 800,
        easing: "easeInOutCubic"
    })

    animation.add({
        targets: '.level-annoucement-transition span',
        top: -32,
        opacity: 0,
        delay: 1000,
        duration: 800,
        easing: "easeInOutCubic"
    })

    animation.add({
        targets: ".card-deck",
        opacity: [0, 1],
    })

    // animation.add({
    //     targets: ".card-deck .card",
    //     top: [-56, 0],
    //     easing: "easeOutCubic",
    //     delay: anime.stagger(200, {from: 'last'})
    // }, "-=1400")
}

function cardDisappearingAnimation(callback: Function) {
    let animationTimeline = anime.timeline({
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
            setTimeout(callback(), 1200)
        }
    });
    animationTimeline.add({
        targets: '.card-deck .card:last-of-type',
        opacity: '-200%',
        marginTop: 0
    })
}

onMounted(() => {
    transitionAnimation()
})
</script>

<template>
    <main id="study">
        <div class="container">
            <div class="level-annoucement-transition" v-if="!dailyStudiesComplete">
                <span>level {{ levelsOfTheDay[levelToStudyIndex] }}</span>
            </div>
            <div class="card-deck" v-if="cards.length && !dailyStudiesComplete">
                <CardComponent v-for="card in cards" v-bind:key="card.id" v-bind="card" @click="handleCardClick(card)"
                               ref="cardsRef"/>
            </div>
            <div class="studies-finished" v-if="dailyStudiesComplete">
                <span>Studies finished! Come back tomorrow</span>
                <Button text="Back to home page" link="/"/>
            </div>
            <div class="studies-finished" v-if="!cards.length && !studyAllowed">
                <span>You are early!! Come back at {{ studyHour }}h for your daily study session</span>
                <Button text="Back to home page" link="/"/>
            </div>
            <!--            <div class="buttons" -->
            <!--                 v-if="cards?.at(-1)?.revealed && !transition"-->
            <!--            >-->
            <!--                <Button text="Je m'en souvenais" success @click="handleResultButtonClick(cards.at(-1) as Card, true)"/>-->
            <!--                <Button text="J'avais oublié" :success="false"-->
            <!--                        @click="handleResultButtonClick(cards[cards.length], false)"/>-->
            <!--            </div>-->
            <div class="buttons"
                 v-if="cards?.at(-1)?.revealed"
            >
                <Button text="Je m'en souvenais" success @click="handleResultButtonClick(cards.at(-1) as Card, true)"/>
                <Button text="J'avais oublié" :success="false"
                        @click="handleResultButtonClick(cards[cards.length], false)"/>
            </div>
        </div>
    </main>
</template>
