import { RouterLink } from 'vue-router';
<script lang="ts">
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink,
    },
    props: {
        text: String,
        link: {
            type: String,
        },
        type: {
            type: String,
            default() {
                return 'alt-1'
            }
        },
        disabled: {
            type: Boolean,
            default() {
                return false
            }
        },
        success: {
            type: Boolean,
            default: null
        }
    },
}
</script>

<template>
    <div v-if="!link" :class="['button', {
            'button--alt-1': type === 'alt-1',
            'button--alt-2': type === 'alt-2',
            'button--success': success,
            'button--failure': success === false,
            'disabled': disabled,
        }]"><span>{{ text }}</span></div>

    <RouterLink v-else :to="link" :class="['button', {
            'button--alt-1': type === 'alt-1',
            'button--alt-2': type === 'alt-2',
            'disabled': disabled
        }]"><span>{{ text }}</span></RouterLink>
</template>