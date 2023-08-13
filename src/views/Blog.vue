<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-container">
                <div class="toggle-edit" v-if="this.$store.state.admin">
                    <span lang-tag="toggle">{{ lang_blog[lang]['toggle'] }}</span>
                    <input type="checkbox" v-model="edit">
                </div>
            </div>
            <Card :post="post" v-for="(post, index) in blogCards" :key="index" />
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Blog',
    components: { Card },
    data() { return { lang_blog, lang: getLangBlog() }; },
    computed: {
        blogCards() { return this.$store.state.blog_posts; },
        edit: {
            get() { return this.$store.getters.edit; },
            set(payload) { this.$store.commit('toggleEdit', payload); }
        }
    },
    created() { this.$store.dispatch('getPosts'); },
    beforeUnmount() { this.$store.commit('toggleEdit', false); }
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
    flex: 1;
}

.blog-cards {
    position: relative;

    .toggle-container {
        display: flex;
        justify-content: end;
        position: absolute;
        top: -80px;
        right: -10px;
        z-index: 1;
    }

    .toggle-edit {
        display: flex;
        align-items: center;
        position: fixed;
        padding: 15px 20px 10px 10px;
        background-color: #f1f1f1;
        border-radius: 0 0 0 15px;

        span {
            margin-right: 16px;
        }

        input[type="checkbox"] {
            cursor: pointer;
            position: relative;
            border: none;
            -webkit-appearance: none;
            appearance: none;
            background-color: #fff;
            outline: none;
            width: 65px;
            height: 25px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }

        input[type="checkbox"]:before {
            content: "";
            position: absolute;
            width: 25px;
            height: 25px;
            border-radius: 20px;
            top: 0;
            left: 0;
            background: var(--blog-clr);
            transform: scale(1.1);
            transition: .4s ease all;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }

        input:checked[type="checkbox"]:before {
            background: #fff;
            left: 40px;
        }
    }
}
</style>