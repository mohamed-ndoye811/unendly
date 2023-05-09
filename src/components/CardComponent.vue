<script lang="ts">
export default {
    props: {
        revealed: {
            type: Boolean,
            required: false,
            default: false
        },
        question: {
            type: String,
            required: false,
            default: "question"
        },
        answer: {
            type: String,
            required: false,
            default: "answer"
        },
        theme: {
            type: String,
            default: "theme"
        },
        categ: {
            type: String,
            default: "categ"
        },
        id: {
            type: Number,
            required: false,
            default: 0
        },
        level: {
            type: Number,
            required: false,
            default: 1
        },
        mode: {
            type: String,
            required: false,
        }
    },
    data() {
        return {
            editMode: this.mode === 'edit',
        }
    },
    methods: {
        updateQuestion: function (event: any) {
            this.$emit('questionUpdate', event.target.innerText);
        },
        updateAnswer: function (event: any) {
            this.$emit('answerUpdate', event.target.innerText);
        },
        updateCateg: function (event: any) {
            this.$emit('categUpdate', event.target.innerText);
        },
        updateTheme: function (event: any) {
            this.$emit('themeUpdate', event.target.innerText);
        }
    },
    mounted() {
    }
}
</script>

<template>
    <div class="card">
        <div class="card-inner" :class="{ revealed: revealed }">
            <div class="back">
                <div class="answer">
                    <div class="label">Réponse</div>
                    <div class="text" :contenteditable="editMode" @input="updateAnswer">{{ answer }}</div>
                </div>
                <div class="styles">
                    <div class="lvl">
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                    </div>
                    <!-- <div class="categ-theme">
                        <div class="categ" :contenteditable="editMode" @input="updateCateg">{{ categ }}</div>
                        <div class="theme" :contenteditable="editMode" @input="updateTheme">{{ theme ?? "theme" }}</div>
                    </div> -->
                </div>
            </div>

            <div class="front">
                <div class="question">
                    <div class="label">Question n°{{ id }}</div>
                    <div class="text" :contenteditable="editMode" @input="updateQuestion">{{ question }}</div>
                </div>
                <div class="styles">
                    <div class="lvl">
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                    </div>
                    <div class="categ-theme">
                        <div class="categ" :contenteditable="editMode" @input="updateCateg">{{ categ }}</div>
                        <div class="theme" :contenteditable="editMode" @input="updateTheme">{{ theme ?? "theme" }}</div>
                    </div>
                </div>
                <div class="instructions">cliquez pour voir la réponse</div>
            </div>
        </div>
    </div>
</template>