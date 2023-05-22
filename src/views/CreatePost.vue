<template>
    <div class="create-post">
        <CoverPreview v-show="this.$store.state.blog_photo_preview" />
        <div class="container">
            <div class="err-message" :class="{ invisible: !error }">
                <p><span lang-tag="error">{{ lang_blog[lang]['error'] }}</span> <span :lang-tag="errorMsg">{{ lang_blog[lang][errorMsg] }}</span></p>
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
                <button @click="uploadBlog" lang-tag="publish">{{ lang_blog[lang]['publish'] }}</button>
                <router-link class="router-button" :to="{ name: 'PreviewPost' }" lang-tag="preview">{{ lang_blog[lang]['preview'] }}</router-link>
            </div>
        </div>
    </div>
    <Loading v-if="loading" />
</template>

<script>
import { getStorage, uploadBytesResumable, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { VueEditor } from 'vue3-editor';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-plus';
import CoverPreview from '../components/CoverPreview.vue';
import Loading from '../components/Loading.vue';
import db, { app } from '../firebase/init';
import { lang_blog, getLangBlog } from '../lang';
window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);
export default {
    name: 'CreatePost',
    components: { VueEditor, CoverPreview, Loading },
    beforeMount() {
        if (this.$store.state.update) {
            this.$store.commit('setBlogState', {
                html: 'Write your blog here...',
                photo_name: '',
                photo: null,
                title: ''
            });
            this.$store.state.update = false;
        }
    },
    data() {
        return {
            lang: getLangBlog(),
            lang_blog,
            file: null,
            error: null,
            errorMsg: null,
            loading: null,
            editorSettings: {
                modules: {
                    imageResize: {}
                }
            }
        };
    },
    methods: {
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
        uploadBlog() {
            if (this.blogTitle.length != 0 && this.blogHTML.length != 0) {
                if (this.file) {
                    this.loading = true;
                    const storage = ref(getStorage(app), `documents/BlogCoverPhotos/${this.blogPhotoName}`);
                    uploadBytes(storage, this.file)
                        .then(async snapshot => {
                            const downloadURL = await getDownloadURL(snapshot.ref)
                            const timestamp = Date.now();
                            const database = collection(db, 'posts');
                            const result = await addDoc(database, {
                                html: this.blogHTML.substr(0, 60),
                                title: this.blogTitle,
                                cover_photo: downloadURL,
                                cover_photo_name: this.blogPhotoName,
                                profile_id: this.profileId,
                                date: timestamp
                            });
                            await setDoc(doc(db, 'details', result.id), { html: this.blogHTML });
                            this.$store.dispatch('getPosts');
                            this.loading = false;
                            this.$router.push({ name: 'ViewPost', params: { id: result.id } });
                        })
                        .catch(() => this.loading = false);
                    return;
                }
                this.errorMsg = 'ensure_cover';
            }
            else {
                this.errorMsg = 'ensure';
            }
            this.error = true;
            setTimeout(() => this.error = false, 5000);
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

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    .router-button {
        margin-top: 5px;
        font-size: 13px;
        text-decoration: none;
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;

        button,
        label {
            margin-top: 0;
        }

        .invisible {
            opacity: 0;
        }
    }

    // error styling
    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        background-color: var(--blog-clr);
        opacity: 1;
        transition: .5s ease opacity;

        p {
            font-size: 14px;
        }

        span:first-child {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        margin-bottom: 10px;

        input:first-child {
            font-size: 24px;
            padding: 5px 8px 5px 0;
            width: 100%;
            margin-top: 3px;
            max-width: 300px;
        }

        input {
            border: none;
            border-bottom: 1px solid var(--blog-clr);

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 var(--blog-clr);
            }
        }

        .upload-file {
            flex: 1;
            position: relative;
            margin-top: 9px;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
            }

            >span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor {
        height: 70vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            display: flex;
            flex-direction: column;
            position: relative;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: auto;
        }
    }

    .blog-actions {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        button {
            margin-top: 5px;
            margin-right: 16px;
        }
    }
}
</style>