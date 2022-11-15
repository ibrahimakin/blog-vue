<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'home' }">Blogs</router-link>
            </div>
            <div class="nav-links">
                <ul>
                    <router-links class="link" to="#">Home</router-links>
                    <router-links class="link" to="#">Blogs</router-links>
                    <router-links class="link" to="#">Create Post</router-links>
                    <router-links class="link" to="#">Login / Register</router-links>
                </ul>
            </div>
        </nav>
        <menu />
        <transition name="mobile-nav">
            <ul>
                <router-links class="link" to="#">Home</router-links>
                <router-links class="link" to="#">Blogs</router-links>
                <router-links class="link" to="#">Create Post</router-links>
                <router-links class="link" to="#">Login / Register</router-links>
            </ul>
        </transition>
    </header>
</template>

<script>
import menu from '../assets/icons/bars-regular.svg';
export default {
    name: 'Navigation',
    components: menu
}
</script>

<style lang="scss" scoped>
header {
    background-color: #0ff;
}
</style>