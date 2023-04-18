<template>
    <Loading v-if="!blog" />
    <div v-else class="post-view">
        <div class="container quillWrapper">
            <h2 class="title">{{ blog.title }}</h2>
            <template v-if="!blog.notfound">
                <h4>Posted on: {{ new Date(blog.date).toLocaleString('en-us', { dateStyle: 'long' }) }}</h4>
                <img class="cover" :src="blog.photo" alt="Blog Cover Photo" />
                <div class="post-content ql-editor" v-html="blog.html"></div>
                <LoadingInline v-if="!blog.loaded" />
            </template>
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import LoadingInline from '../components/LoadingInline.vue';
export default {
    name: 'ViewBlog',
    components: { Loading, LoadingInline },
    data() { return { blog: null }; },
    async created() {
        let m_blog = this.$store.state.blog_posts.find(
            post => post.id === this.$route.params.id
        );
        if (!m_blog) {
            m_blog = { id: this.$route.params.id };
            await this.$store.dispatch('getPost', m_blog);
        }
        else this.$store.dispatch('getPost', m_blog);
        document.title = m_blog.title;
        this.blog = m_blog;
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