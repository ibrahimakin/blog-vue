<template>
    <div>
        <Post v-if="!user" :post="welcome" />
        <Post :post="post" v-for="(post, index) in blogPosts" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3 v-if="this.$store.state.blog_posts.length > 2">View More Recent Posts</h3>
                <div class="blog-cards">
                    <Card :post="post" v-for="(post, index) in blogCards" :key="index" />
                </div>
            </div>
        </div>
        <div v-if="!user" class="updates">
            <div class="container">
                <h2>Never miss a post. Register for your free account today!</h2>
                <router-link class="router-button" :to="{ name: 'Register' }">
                    Register for Blog
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
export default {
    name: 'Home',
    components: { Post, Card, Arrow },
    data() {
        return {
            welcome: {
                title: 'Welcome!',
                html: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
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
            text-transform: uppercase;

            @media (min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    }
}
</style>