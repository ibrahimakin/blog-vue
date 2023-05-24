<template>
    <Loading v-if="!blog" />
    <div v-else class="post-view">
        <div class="container quillWrapper">
            <h2 class="title">{{ blog.title }}</h2>
            <template v-if="!blog.notfound">
                <h4><span lang-tag="posted">{{ lang_blog[lang]['posted'] }}</span>: {{ new Date(blog.date).toDateString() }}</h4>
                <img class="cover" :src="blog.photo" alt="Blog Photo" />
                <div class="post-content ql-editor" v-html="blog.html"></div>
                <LoadingInline v-if="!blog.loaded" />
            </template>
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import LoadingInline from '../components/LoadingInline.vue';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'ViewPost',
    components: { Loading, LoadingInline },
    data() { return { lang_blog, lang: getLangBlog(), blog: null, routeID: null }; },
    beforeRouteUpdate(to, from, next) {
        this.routeID = to.params.id;
        this.getPost();
        next();
    },
    created() {
        this.routeID = this.$route.params.id;
        this.getPost();
    },
    methods: {
        async getPost() {
            let m_blog = this.$store.state.blog_posts.find(post => post.id === this.routeID);
            if (!m_blog) {
                m_blog = { id: this.routeID };
                await this.$store.dispatch('getPost', m_blog);
            }
            else this.$store.dispatch('getPost', m_blog);
            document.title = m_blog.title;
            this.blog = m_blog;
        }
    }
};
</script>

<style lang="scss" scoped>
.post-view {
    h4 {
        margin-bottom: 24px;
        font-weight: 400;
        font-size: 14px;
    }
}
</style>