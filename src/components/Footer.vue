<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'Home' }">Blog</router-link>
                    <ul>
                        <li>
                            <a title="GitHub" href="https://github.com/ibrahimakin" target="_blank">
                                <Github class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a title="Twitter" href="https://twitter.com/iibrahimAKIN" target="_blank">
                                <Twitter class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a title="Instagram" href="https://instagram.com/iibrahimAKIN" target="_blank">
                                <Instagram class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a title="LinkedIn" href="https://www.linkedin.com/in/ibrahim-AKIN" target="_blank">
                                <Linkedin class="svg-icon" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <li><router-link class="link" :to="{ name: 'Home' }" lang-tag="home">{{ lang_blog[lang]['home'] }}</router-link></li>
                        <li><router-link class="link" :to="{ name: 'Blog' }">BLOG</router-link></li>
                        <li v-if="admin"><router-link class="link" :to="{ name: 'CreatePost' }" lang-tag="create">{{ lang_blog[lang]['create'] }}</router-link></li>
                        <li v-if="!user"><router-link class="link" :to="{ name: 'Login' }" lang-tag="login_register">{{ lang_blog[lang]['login_register'] }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p lang-tag="copyright">{{ lang_blog[lang]['copyright'] }}</p>
            </div>
        </div>
    </footer>
</template>

<script>
import Github from '../assets/icons/github.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';
import Linkedin from '../assets/icons/linkedin.svg';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Footer',
    components: { Github, Twitter, Instagram, Linkedin },
    data() { return { lang_blog, lang: getLangBlog() }; },
    computed: {
        admin() { return this.$store.state.admin; },
        user() { return this.$store.state.user; }
    }
};
</script>

<style lang="scss" scoped>
footer {
    position: relative;
    margin-top: auto;
    padding: 80px 25px;
    background-color: var(--blog-clr);
    z-index: 2;

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        >div {
            display: flex;
            flex: 1;
        }

        .left {
            gap: 32px;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;

            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }

            .header {
                text-align: center;
                font-size: 24px;
                color: #fff;
                margin-bottom: 16px;
                text-decoration: none;
                font-weight: 600;

                @media (min-width: 800px) {
                    text-align: initial;
                }
            }

            ul {
                padding: 0;
                gap: 16px;
                list-style: none;
                display: flex;
            }

            .col-1,
            .col-2 {
                gap: 32px;
                display: flex;
                flex: 1;

                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;

                h2 {
                    text-align: center;

                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }

                ul {
                    margin-top: auto;

                    li {
                        display: flex;
                        align-items: center;

                        .svg-icon {
                            width: 24px;
                            height: auto;
                            color: #fff;
                        }
                    }
                }
            }

            .col-2 {
                ul {
                    height: 100%;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;

                    li {
                        text-align: center;
                    }

                    @media (min-width: 800px) {
                        flex-direction: column;

                        li {
                            text-align: unset;
                        }
                    }

                    .link {
                        font-size: 16px;
                        font-weight: 500;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }

        .right {
            gap: 32px;
            color: #fff;
            align-items: center;
            flex-direction: column;

            @media (min-width: 800px) {
                align-items: flex-end;
                gap: 0;
            }
        }

        p {
            margin-top: auto;
            text-align: center;
        }
    }
}
</style>