<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2 class="title">{{ this.blogTitle }}</h2>
            <img class="cover" :src="blogCoverPhoto" alt="Blog Photo" />
            <div class="post-content ql-editor" v-html="blogHTML"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostPreview',
    computed: {
        blogCoverPhoto() { return this.$store.state.blog_photo_url; },
        blogTitle() { return this.$store.state.blog_title; },
        blogHTML() { return this.$store.state.blog_html; }
    }
};
</script>

<style lang="scss">
.post-view {
    padding-left: var(--sidenav-width);

    .container {
        max-width: 1000px;
        padding: 60px 25px;
    }

    .ql-editor {
        min-height: unset;
        padding: 0;
    }

    .title {
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
    }

    .cover {
        width: 100%;
        margin-bottom: 32px;
    }
}
</style>