<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }">Blogs</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login / Register</router-link>
                    <div v-if="user" @click="toggleMenu" class="profile" ref="profile">
                        <span>{{ this.$store.state.initials }}</span>
                        <div v-show="profileMenu" class="profile-menu">
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
                                    <p>Profile</p>
                                </router-link>
                                <router-link v-if="admin" class="option" :to="{ name: 'Admin' }">
                                    <Admin class="icon" />
                                    <p>Admin</p>
                                </router-link>
                                <div @click="signOut" class="option">
                                    <SignOut class="icon" />
                                    <p>Sign Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </nav>
        <div @click.stop="toggleMobileNav" v-show="mobile" ref="menu">
            <Menu :class="{ 'open': mobileNav }" class="menu-icon" />
        </div>
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login / Register</router-link>
                <div v-if="user" class="profile-menu">
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
                            <p>Profile</p>
                        </router-link>
                        <router-link v-if="admin" class="option" :to="{ name: 'Admin' }">
                            <Admin class="icon" />
                            <p>Admin</p>
                        </router-link>
                        <div @click="signOut" class="option">
                            <SignOut class="icon" />
                            <p>Sign Out</p>
                        </div>
                    </div>
                </div>
            </ul>
        </transition>
    </header>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import Menu from '../assets/icons/bars-regular.svg';
import User from '../assets/icons/user-alt-light.svg';
import Admin from '../assets/icons/user-crown-light.svg';
import SignOut from '../assets/icons/sign-out-alt-regular.svg';
export default {
    name: 'Navigation',
    components: { Menu, User, Admin, SignOut },
    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profileMenu: null
        };
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
        document.addEventListener('click', e => {
            if (this.profileMenu) {
                let isClosest = e.target.closest('.profile-menu');
                if (!isClosest && e.target !== this.$refs.profile) {
                    this.profileMenu = false;
                }
            }
            if (this.mobileNav) {
                let isClosest = e.target.closest('.mobile-nav');
                if (!isClosest && e.target !== this.$refs.menu) {
                    this.mobileNav = false;
                }
            }
        });
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleMenu(e) {
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu;
            }
        },
        signOut() {
            signOut(getAuth());
            window.location.reload();
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.admin;
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
    position: sticky;
    z-index: 2;
    top: 0;

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
        padding: 25px 0;

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

        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
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
                background-color: #303030;

                span {
                    pointer-events: none;
                }

                .profile-menu {
                    position: absolute;
                    top: 65px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);

                    .info {
                        padding: 15px;
                    }

                    .options {
                        padding: 15px;
                    }
                }
            }
        }
    }

    .profile-menu {
        color: #fff;

        .info {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #fff;

            .initials {
                position: initial;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #303030;
                background-color: #fff;
            }

            .right {
                flex: 1;
                margin-left: 24px;

                p {
                    font-size: 12px;
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

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        z-index: 2;
        transition: .5s ease color;

        &.open {
            color: #fff;
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
        background-color: #303030;
        top: 0;
        right: 0;
        z-index: 1;

        .link {
            padding: 15px 0;
            color: #fff;
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: 1s ease transform;
    }

    .mobile-nav-enter {
        transform: translateX(250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-leave-to {
        transform: translateX(250px);
    }
}
</style>