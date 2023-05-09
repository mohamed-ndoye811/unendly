<script lang="ts" setup>
import AppButton from '@/components/ButtonComponent.vue';
import {useSettingsStore} from '@/stores/settings.js';
import {ref} from 'vue';
import router from "@/router";

const store = useSettingsStore();

function updateSettings() {
    store.setSettings({
        studyHour: store.studyHour,
        cardsPerDay: store.cardsPerDay,
    });

    router.push('/')
}
</script>

<template>
    <main id="settings">
        <div class="question">
            <div class="question__text">At what time would you like to schedule daily reviews?</div>
            <div class="question__input"
                 :class="{'input-filled': store.studyHour, 'input--invalid': store.studyHour > 24}"
                 error-message="A day doesn't have more than 24 hours">
                <input type="number" placeholder="Enter the time (ex: 8h)" v-model="store.studyHour" max="24"
                       />
            </div>
        </div>
        <div class="question">
            <div class="question__text">How many new cards would you like to add per day?</div>
            <div class="question__input"
                 :class="{'input-filled': store.cardsPerDay, 'input--invalid': store.cardsPerDay > 15 }"
                 error-message="the maximum of new cards per day is 15">
                <input type="number" placeholder="Enter the number of cards (ex: 7)" v-model="store.cardsPerDay"
                       max="15"/>
            </div>
        </div>


        <AppButton text="Save" type="alt-2" @click="updateSettings"
                   :disabled="store.cardsPerDay > 15 || store.studyHour > 24"/>
    </main>
</template>