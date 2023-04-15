<template>
    <Loading v-if="!blog?.loaded" />
    <div v-else-if="blog.notfound" class="post-view">
        <div class="container">
            <h2>{{ blog.title }}</h2>
        </div>
    </div>
    <div v-else class="create-post">
        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
        <div class="container">
            <div class="err-message" :class="{ invisible: !info }">
                <p>{{ this.infoMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
                    <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
            </div>
            <div class="blog-actions">
                <button @click="updateBlog">Save Changes</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Preview Changes</router-link>
            </div>
        </div>
    </div>
    <Loading v-if="loading" />
</template>

<script>
import { ref, getStorage, getDownloadURL, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { VueEditor } from 'vue3-editor';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-plus';
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import Loading from '../components/Loading.vue';
import db, { app } from '../firebase/init';
window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);
export default {
    name: 'EditBlog',
    components: { VueEditor, BlogCoverPreview, Loading },
    data() {
        return {
            file: null,
            info: null,
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
    async mounted() {
        this.routeID = this.$route.params.id;
    },
    beforeUnmount() {
        this.$store.commit('setBlogState', {
            html: 'Write your blog here...',
            photo_name: '',
            photo: null,
            title: ''
        });
    },
    methods: {
        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit('fileNameChange', fileName);
            this.$store.commit('createFileURL', URL.createObjectURL(this.file));
        },
        openPreview() {
            this.$store.commit('openPhotoPreview');
        },
        imageHandler(file, editor, cursorLocation, resetUploader) {
            const storage = getStorage(app);
            const storageRef = ref(storage, `documents/BlogPostPhotos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                () => { },
                () => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        editor.insertEmbed(cursorLocation, 'image', downloadURL);
                        resetUploader();
                    });
                }
            );
        },
        async updateBlog() {
            if (this.blogTitle.length != 0 && this.blogHTML.length != 0) {
                const post = doc(db, 'posts', this.routeID);
                const timestamp = Date.now();
                if (this.file) {
                    this.loading = true;
                    const storage = ref(getStorage(app), `documents/BlogCoverPhotos/${this.blogCoverPhotoName}`);
                    uploadBytes(storage, this.file)
                        .then(async snapshot => {
                            const downloadURL = await getDownloadURL(snapshot.ref)
                            await updateDoc(doc(db, 'details', post.id), { html: this.blogHTML })
                            await updateDoc(post, {
                                html: this.blogHTML.substr(0, 60),
                                title: this.blogTitle,
                                cover_photo: downloadURL,
                                cover_photo_name: this.blogCoverPhotoName,
                                updated: timestamp
                            });
                            await this.$store.dispatch('updatePost', this.routeID);
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
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
                this.infoMsg = 'Changes Saved.';
                this.info = true;
                setTimeout(() => this.info = false, 5000);
                return;
            }
            this.infoMsg = 'Error: Please ensure Blog Title & Blog Post has been filled.';
            this.info = true;
            setTimeout(() => this.info = false, 5000);
            return;
        }
    },
    computed: {
        profileId() {
            return this.$store.state.id;
        },
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit('updateBlogTitle', payload);
            }
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit('newBlogPost', payload);
            }
        },
        blog() {
            if (this.$store.state.postLoaded) {
                let blog = this.$store.state.blogPosts.find(
                    post => post.id === this.$route.params.id
                );
                if (blog) {
                    if (!blog.loaded) this.$store.dispatch('getPost', blog);
                    this.$store.commit('setBlogState', blog);
                    return blog;
                }
                return { title: 'Not Found', loaded: true, notfound: true };
            }
        }
    }
};
</script>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    .router-button {
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
        margin-bottom: 10px;
        background-color: var(--blog-clr);
        opacity: 1;
        transition: .5s ease opacity;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 32px;

        input:first-child {
            min-width: 300px;
            margin-right: 16px;
        }

        input {
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid var(--blog-clr);

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 var(--blog-clr);
            }
        }

        button,
        label {
            text-transform: initial;
        }

        .upload-file {
            flex: 1;
            position: relative;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor {
        height: 60vh;
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
        margin-top: 32px;

        button {
            margin-right: 16px;
        }
    }
}
</style>