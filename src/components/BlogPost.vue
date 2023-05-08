<template>
    <div class="blog-wrapper" :class="{ 'no-user': post.welcome }">
        <div class="blog-content">
            <div>
                <h2 lang="tr">{{ post.title }}</h2>
                <p :class="!post.welcome && 'content-preview'" v-html="post.html"></p>
                <router-link class="link link-light" v-if="post.welcome" :to="{ name: 'Login' }">
                    Login / Register
                    <Arrow class="arrow arrow-light" />
                </router-link>
                <router-link class="link" v-else :to="{ name: 'ViewBlog', params: { id: post.id } }">
                    View The Post
                    <Arrow class="arrow" />
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img :src="post.photo" alt="Blog Photo">
        </div>
    </div>
</template>

<script>
import Arrow from '../assets/icons/arrow.svg';
export default {
    name: 'BlogPost',
    props: ['post'],
    components: { Arrow }
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

    @media (min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;

        @media (min-width: 700px) {
            order: 1;
        }

        @media (min-width: 800px) {
            flex: 3;
        }

        div {
            max-width: 375px;
            padding: 72px 24px;

            @media (min-width: 700px) {
                padding: 0 24px;
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 480px;

                @media (min-width: 700px) {
                    max-height: 500px;
                    font-size: 40px;
                }
            }

            p {
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview {
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in border-bottom-color;

                &:hover {
                    border-bottom-color: var(--blog-clr);
                }
            }

            .link-light {
                &:hover {
                    border-bottom-color: #fff;
                }
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

        @media (min-width: 700px) {
            order: 2;
        }

        @media (min-width: 800px) {
            flex: 4;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even) {
        .blog-content {
            order: 2;
        }

        .blog-photo {
            order: 1;
        }
    }
}

.blog-wrapper.no-user {
    box-shadow: none;
}

.no-user {
    .blog-content {
        background-color: var(--blog-clr);
        color: #fff;
    }
}
</style>