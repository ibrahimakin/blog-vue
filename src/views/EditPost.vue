<template>
    <Loading v-if="!this.loaded" />
    <div v-else-if="blog?.notfound" class="post-view">
        <div class="container">
            <h2 class="title">{{ blog.title }}</h2>
        </div>
    </div>
    <div v-else class="create-post">
        <CoverPreview v-show="this.$store.state.blog_photo_preview" />
        <div class="container">
            <div class="err-message" :class="{ invisible: !info }">
                <p :lang-tag="infoMsg">{{ lang_blog[lang][infoMsg] }}&nbsp;</p>
            </div>
            <div class="blog-info">
                <input type="text" :placeholder="lang_blog[lang]['title']" lang-tag="title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo" lang-tag="upload">{{ lang_blog[lang]['upload'] }}</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
                    <button @click="openPreview" class="preview" lang-tag="preview_photo" :class="{ 'button-inactive': !this.$store.state.blog_photo_url }">
                        {{ lang_blog[lang]['preview_photo'] }}
                    </button>
                    <span><span lang-tag="file">{{ lang_blog[lang]['file'] }}</span>: {{ this.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
            </div>
            <div class="blog-actions">
                <button @click="updateBlog" lang-tag="save">{{ lang_blog[lang]['save'] }}</button>
                <router-link class="router-button" :to="{ name: 'PreviewPost' }" lang-tag="preview">{{ lang_blog[lang]['preview'] }}</router-link>
            </div>
        </div>
    </div>
    <Loading v-if="loading" />
</template>

<script>
import { ref, getStorage, getDownloadURL, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { VueEditor } from 'vue3-editor';
import CoverPreview from '../components/CoverPreview.vue';
import Loading from '../components/Loading.vue';
import db, { app } from '../firebase/init';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'EditPost',
    components: { VueEditor, CoverPreview, Loading },
    data() {
        return {
            lang: getLangBlog(),
            lang_blog,
            file: null,
            info: null,
            blog: null,
            loaded: null,
            infoMsg: null,
            loading: null,
            routeID: null,
            editorSettings: {
                modules: {
                    imageResize: {}
                }
            }
        };
    },
    beforeRouteUpdate(to, from, next) {
        if (from.name === 'EditPost') this.loaded = false;
        this.routeID = to.params.id;
        this.getPost();
        next();
    },
    mounted() {
        this.routeID = this.$route.params.id;
        this.getPost();
    },
    methods: {
        async getPost() {
            let m_blog = this.$store.state.blog_posts.find(post => post.id === this.routeID);
            if (!m_blog) m_blog = { id: this.routeID };
            await this.$store.dispatch('getPost', m_blog);
            if (!m_blog.notfound) this.$store.commit('setBlogState', m_blog);
            document.title = 'Edit | ' + m_blog.title;
            this.blog = m_blog;
            this.loaded = true;
        },
        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            if (this.file) {
                this.$store.commit('fileNameChange', this.file.name);
                this.$store.commit('createFileURL', URL.createObjectURL(this.file));
            }
        },
        openPreview() { this.$store.commit('openPhotoPreview'); },
        imageHandler(file, editor, cursorLocation, resetUploader) {
            const storage = getStorage(app);
            const storageRef = ref(storage, `documents/BlogPostPhotos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', () => { }, () => { }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    editor.insertEmbed(cursorLocation, 'image', downloadURL);
                    resetUploader();
                });
            });
        },
        async updateBlog() {
            if (this.blogTitle.length != 0 && this.blogHTML.length != 0) {
                const post = doc(db, 'posts', this.routeID);
                const timestamp = Date.now();
                if (this.file) {
                    this.loading = true;
                    const storage = ref(getStorage(app), `documents/BlogCoverPhotos/${this.blogPhotoName}`);
                    uploadBytes(storage, this.file)
                        .then(async snapshot => {
                            const downloadURL = await getDownloadURL(snapshot.ref)
                            await updateDoc(doc(db, 'details', post.id), { html: this.blogHTML })
                            await updateDoc(post, {
                                html: this.blogHTML.substr(0, 60),
                                title: this.blogTitle,
                                cover_photo: downloadURL,
                                cover_photo_name: this.blogPhotoName,
                                updated: timestamp
                            });
                            await this.$store.dispatch('updatePost', this.routeID);
                            this.loading = false;
                        })
                        .catch(() => this.loading = false);
                }
                else {
                    this.loading = true;
                    await updateDoc(doc(db, 'details', post.id), { html: this.blogHTML })
                    await updateDoc(post, {
                        title: this.blogTitle,
                        html: this.blogHTML.substr(0, 60),
                        updated: timestamp
                    });
                    await this.$store.dispatch('updatePost', this.routeID);
                    this.loading = false;
                }
                this.infoMsg = 'saved';
                this.info = true;
                setTimeout(() => this.info = false, 5000);
                return;
            }
            this.infoMsg = 'ensure';
            this.info = true;
            setTimeout(() => this.info = false, 5000);
            return;
        }
    },
    computed: {
        profileId() { return this.$store.state.id; },
        blogPhotoName() { return this.$store.state.blog_photo_name; },
        blogTitle: {
            get() { return this.$store.state.blog_title; },
            set(payload) { this.$store.commit('updateBlogTitle', payload); }
        },
        blogHTML: {
            get() { return this.$store.state.blog_html; },
            set(payload) { this.$store.commit('newBlogPost', payload); }
        }
    }
};
</script>