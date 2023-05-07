<script setup>
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Navigation v-if="!navigation" />
    <RouterView />
    <Footer v-if="!navigation" />
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
    data() { return { navigation: null }; },
    created() {
        onAuthStateChanged(getAuth(), user => {
            this.$store.commit('updateUser', user);
            if (user) this.$store.dispatch('getCurrentUser', user);
        });
        this.checkRoute();
    },
    methods: {
        checkRoute() {
            if (['Login', 'Register', 'ForgotPassword'].includes(this.$route.name)) {
                this.navigation = true;
                return;
            }
            this.navigation = false;
        }
    },
    watch: { $route() { this.checkRoute(); } }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap);

:root {
    --blog-clr: #303030;
    --bg-clr: var(--blog-clr);
    --nav-clr: var(--blog-clr);
}

#topnav {
    background-color: var(--blog-clr);
}

side-nav {
    min-width: var(--sidenav-width);
}

.filled {
    border: 1px solid var(--bg-clr);
}

.filled::before {
    transition: .5s ease background-color;
}

#collapse:hover+.filled::before,
.pin-menu:hover+.filled::before,
.filled:hover::before {
    background-color: rgba(48, 48, 48, .7);
}

@media screen and (max-width: 450px) {
    #app .mobile-nav {
        top: var(--topnav-height);
    }
}

* {
    margin: 0;
    padding: 0;
    font-family: "Quicksand", sans-serif;
}

#app {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    width: 100%;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
}

.link-light {
    color: #fff;
}

.arrow {
    margin-left: 8px;
    width: 12px;
}

.arrow-light {
    path {
        fill: #fff;
    }
}

button,
.create-post label,
.router-button {
    cursor: pointer;
    margin-top: 24px;
    padding: 12px 24px;
    background-color: var(--blog-clr);
    transition: .5s ease background-color;
    border-radius: 20px;
    border: none;
    color: #fff;
    text-transform: uppercase;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgba(48, 48, 48, .7);
    }
}

.button-ghost {
    color: #000;
    padding: 0;
    border-radius: 0;
    margin-top: 50px;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;

    @media (min-width: 700px) {
        margin-top: 0;
        margin-left: auto;
    }

    i {
        margin-left: 8px;
    }
}

.button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
}

.button-inactive {
    pointer-events: none;
    cursor: none;
    background-color: rgba(128, 128, 128, 0.5);
}

.error {
    text-align: center;
    font-size: 12px;
    color: #f00;
}

.content-preview>p:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
}

.blog-card-wrap {
    padding: 80px 16px;
    background-color: #f1f1f1;

    .blog-cards {
        display: grid;
        gap: 32px;
        grid-template-columns: 1fr;

        @media (min-width: 500px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}
</style>