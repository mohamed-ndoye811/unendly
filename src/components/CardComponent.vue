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
            this.$emit('questionUpdate', event.target.value);
        },
        updateAnswer: function (event: any) {
            this.$emit('answerUpdate', event.target.value);
        },
        updateCateg: function (event: any) {
            this.$emit('categUpdate', event.target.value);
        },
        updateTheme: function (event: any) {
            this.$emit('themeUpdate', event.target.value);
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
                    <input v-if="editMode" class="text" @input="updateAnswer" type="text" placeholder="Answer">
                    <div v-else class="text">{{ answer ?? "Answer" }}</div>
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
                    <div class="label">Question {{ id }}</div>
                    <input v-if="editMode" class="text" name="question" @input="updateQuestion"
                           type="text" placeholder="Question">
                    <div v-else class="text">{{ question ?? "Question" }}</div>
                </div>
                <div class="styles">
                    <div class="lvl">
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                        <span>LVL {{ level }}</span>
                    </div>
                    <div class="categ-theme" :class="{'categ-theme--edit': editMode}">
                        <input v-if="editMode" class="categ categ--edit" name="categ" type="text" placeholder="categ"
                               @input="updateCateg">
                        <div v-else-if="categ" class="categ">{{ categ }}</div>
                        <input v-if="editMode" class="theme theme--edit" name="theme" type="text" placeholder="theme"
                               @input="updateTheme">
                        <div v-else-if="theme" class="theme">{{ theme }}</div>

                    </div>
                </div>
                <div class="instructions">cliquez pour voir la réponse</div>
            </div>
        </div>
    </div>
</template>