<template>
    <div class="auth-nav">
        <div class="auth-branding">
            <router-link class="header" :to="{ name: 'Home' }">Blog</router-link>
        </div>
    </div>
    <div class="auth-background">
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    <span lang-tag="back">{{ lang_blog[lang]['back'] }}</span>&nbsp;
                    <RouterLink class="router-link" :to="{ name: 'Login' }" lang-tag="login">
                        {{ lang_blog[lang]['login'] }}
                    </RouterLink>
                </p>
                <h2 lang-tag="reset_password">{{ lang_blog[lang]['reset_password'] }}</h2>
                <p lang-tag="forgot_email">{{ lang_blog[lang]['forgot_email'] }}</p>
                <div class="inputs">
                    <div class="input">
                        <input type="email" :placeholder="lang_blog[lang]['email']" v-model="email" lang-tag="email">
                        <email class="icon" />
                    </div>
                </div>
                <button @click.prevent="resetPassword" lang-tag="reset">{{ lang_blog[lang]['reset'] }}</button>
            </form>
            <div class="background"></div>
        </div>
        <Loading v-if="loading" />
        <Modal v-if="modalActive" :message="modalMessage" v-on:close-modal="close" :lang_tag="lang_tag" />
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import email from '../assets/icons/envelope.svg';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'ForgotPassword',
    components: { email, Loading, Modal },
    data() {
        return { lang_blog, lang: getLangBlog(), email: '', loading: null, modalActive: null, modalMessage: '', lang_tag: null };
    },
    methods: {
        resetPassword() {
            this.loading = true;
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email).then(() => {
                this.modalMessage = lang_blog[this.lang]['exists'];
                this.lang_tag = 'exists';
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                this.modalMessage = err.message;
                this.loading = false;
                this.modalActive = true;
                this.lang_tag = null;
            });
        },
        close() {
            this.modalActive = !this.modalActive;
            this.email = '';
        }
    }
};
</script>

<style lang="scss" scoped>
.form-wrap {
    .reset {
        h2 {
            margin-bottom: 16px;
        }

        p {
            text-align: center;
            margin-bottom: 32px;
        }
    }
}
</style>