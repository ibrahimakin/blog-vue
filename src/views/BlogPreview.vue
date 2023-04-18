<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2 class="title">{{ this.blogTitle }}</h2>
            <img class="cover" :src="blogCoverPhoto" alt="" />
            <div class="post-content ql-editor" v-html="blogHTML"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostPreview',
    computed: {
        blogTitle() {
            return this.$store.state.blog_title;
        },
        blogHTML() {
            return this.$store.state.blog_html;
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        }
    }
};
</script>

<style lang="scss">
.post-view {
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