<script setup>
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Navigation :auth="auth" />
    <RouterView />
    <Footer v-if="!auth" />
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
    data() { return { auth: null }; },
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
                this.auth = true;
                return;
            }
            this.auth = false;
        }
    },
    watch: { $route() { this.checkRoute(); } }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap);

:root {
    --bg-clr: #fff;
    --blog-clr: #303030;
    --nav-clr: var(--blog-clr);
}

side-nav {
    width: 0;
}

#topnav {
    background-color: #fff;
}

.filled {
    border: 1px solid var(--blog-clr);
}

.filled::before {
    transition: .5s ease background-color;
}

#collapse:hover+.filled::before,
.menu.hvr>.pin-menu:hover+.filled::before,
:not(.menu)>.filled:hover::before,
.menu.hvr>.filled:hover::before {
    background-color: rgba(48, 48, 48, .7);
}

@media screen and (max-width: 450px) {
    :root {
        --sidenav-width: 0;
    }

    #root .mobile-nav {
        top: var(--topnav-height);
    }
}

* {
    font-family: "Quicksand", sans-serif;
}

#root {
    display: flex;
    flex-direction: column;
    position: relative;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.link {
    cursor: pointer;
    text-decoration: none;
    color: #000;
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

    .container {
        padding-left: var(--sidenav-width);
    }

    .blog-cards {
        display: grid;
        gap: 32px;
        grid-template-columns: 1fr;

        @media (min-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1000px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 1300px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}

@media print {
    :root {
        --sidenav-width: 0;
    }

    header, footer, .updates {
        display: none;
    }
}
</style>