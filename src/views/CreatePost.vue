<template>
    <div class="create-post">
        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
        <div class="container">
            <div class="err-message" :class="{ invisible: !error }">
                <p><span>Error:</span> {{ this.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange"
                        accept=".png, .jpg, .jpeg" />
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
                    @image-added="imageHandler" />
            </div>
            <div class="blog-actions">
                <button>Publish Blog</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { VueEditor } from 'vue3-editor';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-plus';
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import { app } from '../firebase/init';
window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);
export default {
    name: 'CreatePost',
    components: { VueEditor, BlogCoverPreview },
    data() {
        return {
            file: null,
            error: null,
            errorMsg: null,
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
        }
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
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
        background-color: #303030;
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
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
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