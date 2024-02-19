<template>
    <header :class="{ 'auth': auth }">
        <div>
            <nav class="container">
                <div class="branding">
                    <router-link class="header" :to="{ name: 'Home' }">Blog</router-link>
                </div>
                <div class="routers" v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home' }" lang-tag="home">{{ lang_blog[lang]['home'] }}</router-link>
                    <router-link class="link" :to="{ name: 'Blog' }">BLOG</router-link>
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }" lang-tag="create">{{ lang_blog[lang]['create'] }}</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }" lang-tag="login_register">{{ lang_blog[lang]['login_register'] }}</router-link>
                    <div v-if="user" @click="toggleMenu" class="profile" ref="profile">
                        <span>{{ this.$store.state.initials }}</span>
                        <div v-show="profileMenu" class="profile-menu">
                            <span></span>
                            <div class="info">
                                <p class="initials">{{ this.$store.state.initials }}</p>
                                <div class="right">
                                    <p>{{ this.$store.state.firstname }} {{ this.$store.state.lastname }}</p>
                                    <p>{{ this.$store.state.username }}</p>
                                    <p>{{ this.$store.state.email }}</p>
                                </div>
                            </div>
                            <div class="options">
                                <router-link class="option" :to="{ name: 'Profile' }">
                                    <User class="icon" />
                                    <p lang-tag="profile_t">{{ lang_blog[lang]['profile_t'] }}</p>
                                </router-link>
                                <router-link v-if="admin" class="option" :to="{ name: 'Admin' }">
                                    <Admin class="icon" />
                                    <p lang-tag="admin_t">{{ lang_blog[lang]['admin_t'] }}</p>
                                </router-link>
                                <div @click="signOut" class="option">
                                    <SignOut class="icon" />
                                    <p lang-tag="sign_out_t">{{ lang_blog[lang]['sign_out_t'] }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div @click.stop="toggleMobileNav" v-show="mobile && !auth" ref="menu" :class="{ 'open': mobileNav }" class="con">
            <div class="bar arrow-top"></div>
            <div class="bar"></div>
            <div class="bar arrow-bottom"></div>
        </div>
        <transition name="mobile-nav">
            <div class="mobile-nav" v-show="mobileNav && !auth">
                <div v-if="user" class="profile-menu">
                    <div class="info">
                        <p class="initials">{{ this.$store.state.initials }}</p>
                        <div class="right">
                            <p>{{ this.$store.state.firstname }} {{ this.$store.state.lastname }}</p>
                            <p>{{ this.$store.state.username }}</p>
                            <p>{{ this.$store.state.email }}</p>
                        </div>
                    </div>
                </div>
                <router-link class="link" :to="{ name: 'Home' }" lang-tag="home">{{ lang_blog[lang]['home'] }}</router-link>
                <router-link class="link" :to="{ name: 'Blog' }">BLOG</router-link>
                <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }" lang-tag="create">{{ lang_blog[lang]['create'] }}</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Login' }" lang-tag="login_register">{{ lang_blog[lang]['login_register'] }}</router-link>
                <router-link v-if="user" class="link" :to="{ name: 'Profile' }" lang-tag="profile">{{ lang_blog[lang]['profile'] }}</router-link>
                <router-link v-if="admin" class="link" :to="{ name: 'Admin' }" lang-tag="admin">{{ lang_blog[lang]['admin'] }}</router-link>
                <div v-if="user" @click="signOut" class="link" lang-tag="sign_out">{{ lang_blog[lang]['sign_out'] }}</div>
            </div>
        </transition>
    </header>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import User from '../assets/icons/user.svg';
import Admin from '../assets/icons/user-crown.svg';
import SignOut from '../assets/icons/sign-out.svg';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Navigation',
    components: { User, Admin, SignOut },
    props: ['auth'],
    data() {
        return {
            lang_blog, lang: getLangBlog(), mobile: null, mobileNav: null,
            windowWidth: null, profileMenu: null
        };
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
        document.addEventListener('click', e => {
            if (this.profileMenu) {
                let isClosest = e.target.closest('.profile-menu');
                if (!isClosest && e.target !== this.$refs.profile) this.profileMenu = false;
            }
            if (this.mobileNav) {
                let isClosest = e.target.closest('.mobile-nav');
                if (this.auth || !isClosest && e.target !== this.$refs.menu) this.mobileNav = false;
            }
        });
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) this.mobile = true;
            else { this.mobile = false; this.mobileNav = false; }
        },
        toggleMobileNav() { this.mobileNav = !this.mobileNav; },
        toggleMenu(e) { if (e.target === this.$refs.profile) this.profileMenu = !this.profileMenu; },
        signOut() { signOut(getAuth()); window.location.reload(); }
    },
    computed: {
        admin() { return this.$store.state.admin; },
        user() { return this.$store.state.user; }
    }
}
</script>

<style lang="scss" scoped>
header {
    padding: 0 25px;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
    position: sticky;
    z-index: 2;
    top: 0;

    >div:first-child {
        width: min(100vw - 3%, 100vw - 50px);
    }

    &.auth {
        background-color: unset;
        position: absolute;
        box-shadow: none;
        width: 100%;

        .routers, .con {
            visibility: hidden;
        }
    }

    .container {
        padding-left: var(--sidenav-width);
        justify-content: space-between;
    }

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s ease color;

        &:hover {
            color: #1eb8b8;
        }
    }

    nav {
        display: flex;
        padding: 10px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }

        .routers {
            display: flex;
            align-items: center;
            height: 40px;

            .link {
                margin-right: 32px;
            }

            .link:last-child {
                margin-right: 0;
            }
        }

        .profile {
            position: relative;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #fff;
            background-color: var(--blog-clr);

            span {
                pointer-events: none;
            }

            .profile-menu {
                position: absolute;
                top: 50px;
                right: 0;
                width: 250px;
                border-radius: 0 0 10px 10px;
                background-color: var(--blog-clr);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

                span {
                    position: absolute;
                    right: 10px;
                    top: -10px;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid var(--blog-clr);
                }

                .info {
                    padding: 15px;
                }

                .options {
                    padding: 15px;
                }
            }
        }
    }

    .profile-menu {
        color: #fff;

        .info {
            display: flex;
            align-items: center;
            padding-bottom: 12px;
            border-bottom: 1px solid #fff;

            .initials {
                position: initial;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: var(--blog-clr);
                background-color: #fff;
            }

            .right {
                flex: 1;
                margin-left: 24px;
                overflow: hidden;

                p {
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                p:first-child {
                    font-size: 14px;
                }
            }
        }

        .options {
            padding: 15px 0;

            .option {
                text-decoration: none;
                color: #fff;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;

                .icon {
                    width: 18px;
                    height: auto;
                }

                p {
                    font-size: 14px;
                    margin-left: 12px;
                }

                &:last-child {
                    margin-bottom: 0px;
                }
            }
        }
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: var(--blog-clr);
        transition: .7s ease transform;
        top: 0;
        right: 0;
        overflow: auto;

        .profile-menu {
            margin-bottom: 10px;

            .right>p:nth-child(1),
            .right>p:nth-child(2) {
                margin-right: 40px;
            }
        }

        .link {
            padding: 12px 0;
            color: #fff;
        }
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(250px);
    }

    .con {
        cursor: pointer;
        position: absolute;
        top: 11px;
        right: 25px;
        z-index: 1;
        --arrow-w: 12px;
        --arrow-x: 8.8px;
        --arrow-y: -2px;
    }

    .bar {
        height: 3px;
        width: 22px;
        background-color: #000;
        margin: 5px auto;
    }

    .con.open .bar {
        background-color: #fff;
    }

    .bar {
        -webkit-transition: all .7s ease;
        -moz-transition: all .7s ease;
        -ms-transition: all .7s ease;
        -o-transition: all .7s ease;
        transition: all .7s ease;
    }

    .con.open .arrow-top {
        -webkit-transform: rotateZ(45deg) translateY(5px);
        -moz-transform: rotateZ(45deg) translateY(5px);
        -ms-transform: rotateZ(45deg) translateY(5px);
        -o-transform: rotateZ(45deg) translateY(5px);
        transform: rotateZ(45deg) translateY(var(--arrow-y)) translateX(var(--arrow-x));
        width: var(--arrow-w);
    }

    .con.open .arrow-bottom {
        -webkit-transform: rotateZ(-45deg) translateY(-5px);
        -moz-transform: rotateZ(-45deg) translateY(-5px);
        -ms-transform: rotateZ(-45deg) translateY(-5px);
        -o-transform: rotateZ(-45deg) translateY(-5px);
        transform: rotateZ(-45deg) translateY(calc(-1 * var(--arrow-y))) translateX(var(--arrow-x));
        width: var(--arrow-w);
    }

    @media screen and (max-width: 450px) {
        &:not(.auth) {
            top: var(--topnav-height);
        }
    }

    @media screen and (max-height: 450px) {
        nav {
            padding: 5px 0;

            .profile .profile-menu {
                top: 45px;
            }
        }

        .con {
            top: 6px;
        }
    }
}
</style>