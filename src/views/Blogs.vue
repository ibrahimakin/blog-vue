<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-container">
                <div class="toggle-edit" v-if="this.$store.state.admin">
                    <span>Toggle Editing Post</span>
                    <input type="checkbox" v-model="edit">
                </div>
            </div>
            <BlogCard :post="post" v-for="(post, index) in blogCards" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue';
export default {
    name: 'Blogs',
    components: { BlogCard },
    computed: {
        blogCards() {
            return this.$store.state.blog_posts;
        },
        edit: {
            get() {
                return this.$store.getters.edit;
            },
            set(payload) {
                this.$store.commit('toggleEdit', payload);
            }
        }
    },
    created() {
        if (!this.$store.state.post_loaded) {
            this.$store.dispatch('getPosts');
        }
    },
    beforeUnmount() {
        this.$store.commit('toggleEdit', false);
    }
}
</script>

<style lang="scss" scoped>
.blog-cards {
    position: relative;

    .toggle-container {
        display: flex;
        justify-content: end;
        position: absolute;
        top: -80px;
        right: -10px;
        z-index: 1;
    }

    .toggle-edit {
        display: flex;
        align-items: center;
        position: fixed;
        padding: 15px 10px 10px 10px;
        background-color: #f1f1f1;
        border-radius: 0 0 0 25px;

        span {
            margin-right: 16px;
        }

        input[type="checkbox"] {
            cursor: pointer;
            position: relative;
            border: none;
            -webkit-appearance: none;
            appearance: none;
            background-color: #fff;
            outline: none;
            width: 80px;
            height: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }

        input[type="checkbox"]:before {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            top: 0;
            left: 0;
            background: var(--blog-clr);
            transform: scale(1.1);
            transition: .4s ease all;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
        }

        input:checked[type="checkbox"]:before {
            background: #fff;
            left: 52px;
        }
    }
}
</style>