<template>
    <router-link class="blog-card" :to="{ name: 'ViewBlog', params: { id: post.id } }">
        <div v-show="edit" class="icons">
            <div @click.prevent="editPost" class="icon">
                <Edit class="edit" />
            </div>
            <div @click.prevent="deletePost" class="icon">
                <Delete class="delete" />
            </div>
        </div>
        <img :src="post.photo" alt="blog-card">
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h6>Posted on: {{ new Date(post.date).toLocaleString('en-us', { dateStyle: 'long' }) }}</h6>
            <div class="link">
                View The Post
                <Arrow class="arrow" />
            </div>
        </div>
    </router-link>
</template>

<script>
import Arrow from '../assets/icons/arrow-right-light.svg';
import Delete from '../assets/icons/trash-regular.svg';
import Edit from '../assets/icons/edit-regular.svg';
export default {
    name: 'BlogCard',
    props: ['post'],
    components: { Arrow, Delete, Edit },
    methods: {
        deletePost() {
            this.$store.dispatch('deletePost', this.post.id);
        },
        editPost() {
            this.$router.push({ name: 'EditBlog', params: { id: this.post.id } });
        }
    },
    computed: {
        edit() {
            return this.$store.getters.edit;
        }
    }
};
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: .5s ease transform;
    text-decoration: none;
    overflow: hidden;
    z-index: 0;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: .5s ease background-color;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    color: #fff;
                }
            }

            &:first-child {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 32px 16px;
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            font-size: 12px;
            padding-top: 20px;
            padding-bottom: 4px;
            transition: .5s ease-in color;

            &:hover {
                color: rgba(48, 48, 48, .8);
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>