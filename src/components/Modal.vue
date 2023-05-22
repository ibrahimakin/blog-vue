<template>
    <div class="modal">
        <div class="modal-content">
            <p :lang-tag="this.lang_tag">{{ this.message }}</p>
            <button @click="close" lang-tag="close">{{ lang_blog[lang]['close'] }}</button>
        </div>
    </div>
</template>

<script>
import { lang_blog, getLangBlog } from '../lang';
export default {
    props: ['message', 'lang_tag'],
    data() { return { lang_blog, lang: getLangBlog() }; },
    methods: { close() { this.$emit('close-modal'); } }
}
</script>

<style lang="scss">
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 3;

    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 8px;
        width: 100%;
        max-width: 330px;
        padding: 40px 30px;
        background-color: #fff;

        p {
            text-align: center;
        }

        button {
            align-self: center;
        }
    }
}
</style>