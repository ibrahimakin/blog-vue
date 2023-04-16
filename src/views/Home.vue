<template>
    <div class="home">
        <BlogPost v-if="!user" :post="welcome" />
        <BlogPost :post="post" v-for="(post, index) in blogPosts" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3 v-if="this.$store.state.blog_posts.length > 2">View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard :post="post" v-for="(post, index) in blogCards" :key="index" />
                </div>
            </div>
        </div>
        <div v-if="!user" class="updates">
            <div class="container">
                <h2>Never miss a post. Register for your free account today!</h2>
                <router-link class="router-button" :to="{ name: 'Register' }">
                    Register for Blogs
                    <Arrow class="arrow arrow-light" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';
import Arrow from '../assets/icons/arrow-right-light.svg';
export default {
    name: 'Home',
    components: { BlogPost, BlogCard, Arrow },
    data() {
        return {
            welcome: {
                title: 'Welcome!',
                html: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
                photo: 'assets/coding.jpg',
                welcome: true
            }
        };
    },
    created() {
        if (!this.$store.state.post_loaded) {
            this.$store.dispatch('getPosts');
        }
    },
    computed: {
        blogPosts() {
            return this.$store.getters.blogPosts;
        },
        blogCards() {
            return this.$store.getters.blogCards;
        },
        user() {
            return this.$store.state.user;
        }
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