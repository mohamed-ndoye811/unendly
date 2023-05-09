<script lang="ts">
import Logo from '@/components/LogoComponent.vue';
import Button from "@/components/ButtonComponent.vue";

import {useStudyStore} from '@/stores/study';
import {storeToRefs} from 'pinia';
import {ref} from 'vue';

export default {
    components: {
        Logo,
        AppButton: Button,
    },
    data: () => {
        const studyStore = useStudyStore();

        return {
            ...storeToRefs(studyStore),
            notificationsSupported: ref(false),
        }
    },
    methods: {
        askPermission() {
            if (this.notificationsSupported) {
                Notification.requestPermission(result => {
                    console.log('result from permission question', result);
                    if (result !== 'granted') {
                        alert('You probably do not like notifications?!');
                    } else {
                        console.log('A notification will be send from the service worker => This only works in production');
                        this.showNotification()
                    }
                })
            }
        },
        async showNotification() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready // returns a Promise, the active SW registration
                    .then(swreg => swreg.showNotification('Notifications successfully set up!', {
                        body: 'You can now edit the hour of your daily study',
                        icon: './logo/icon.svg',
                        data: {
                            url: '/daily-new-cards', // pass the current url to the notification
                        },
                        vibrate: [300, 200, 300],
                        badge: './logo/icon.svg',
                        actions: [
                            { action: 'confirm', title: "Let's study!", icon: '/img/icons/android-chrome-192x192.png'},
                        ],
                    }))
            }
        },

    },
    created() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            this.notificationsSupported = true;
        }
    },
}
</script>

<template>
    <main id="home">
        <Logo class="logo"></Logo>
        <div class="buttons">
            <AppButton text="settings" link="/settings" type="alt-2"></AppButton>
            <AppButton text="Start study" link="/daily-new-cards"></AppButton>
            <AppButton text="Enable notifications" @click="askPermission"></AppButton>
        </div>
    </main>
</template>
