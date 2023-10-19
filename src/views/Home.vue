<template>
    <div>
        <Post v-if="!user" :post="welcome" />
        <Post :post="post" v-for="(post, index) in blogPosts" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3 v-if="this.$store.state.blog_posts.length > 2" lang-tag="view_more">{{ lang_blog[lang]['view_more'] }}</h3>
                <div class="blog-cards">
                    <Card :post="post" v-for="(post, index) in blogCards" :key="index" />
                </div>
            </div>
        </div>
        <div v-if="!user" class="updates">
            <div class="container">
                <h2 lang-tag="never_miss">{{ lang_blog[lang]['never_miss'] }}</h2>
                <router-link class="router-button" :to="{ name: 'Register' }">
                    <span lang-tag="register_blog">{{ lang_blog[lang]['register_blog'] }}</span>
                    <Arrow class="arrow arrow-light" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Post from '../components/Post.vue';
import Card from '../components/Card.vue';
import Arrow from '../assets/icons/arrow.svg';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Home',
    components: { Post, Card, Arrow },
    data() {
        const lang = getLangBlog();
        return {
            lang_blog, lang,
            welcome: {
                title: lang_blog[lang]['welcome'],
                html: lang_blog[lang]['html'],
                photo: '/assets/images/blog/coding.jpg',
                welcome: true
            }
        };
    },
    created() { this.$store.dispatch('getPosts'); },
    computed: {
        blogPosts() { return this.$store.getters.blogPosts; },
        blogCards() { return this.$store.getters.blogCards; },
        user() { return this.$store.state.user; }
    }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
    h3 {
        font-weight: 300;
        font-size: 28px;
        margin-bottom: 32px;
    }
}

.updates {
    padding-left: var(--sidenav-width);

    .container {
        padding: 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 800px) {
            padding: 125px 25px;
            flex-direction: row;
        }

        .router-button {
            display: flex;
            font-size: 14px;
            text-decoration: none;

            @media (min-width: 800px) {
                margin-left: auto;
            }
        }

        h2 {
            font-weight: 300;
            font-size: 32px;
            max-width: 425px;
            width: 100%;
            text-align: center;

            @media (min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    }
}
</style>