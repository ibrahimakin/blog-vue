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
                    Back to
                    <RouterLink class="router-link" :to="{ name: 'Login' }">
                        Login
                    </RouterLink>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it.</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="e-mail" v-model="email">
                        <email class="icon" />
                    </div>
                </div>
                <button @click.prevent="resetPassword">Reset</button>
            </form>
            <div class="background"></div>
        </div>
        <Loading v-if="loading" />
        <Modal v-if="modalActive" :message="modalMessage" v-on:close-modal="close" />
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import email from '../assets/icons/envelope.svg';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';
export default {
    name: 'ForgotPassword',
    components: { email, Loading, Modal },
    data() { return { email: '', loading: null, modalActive: null, modalMessage: '' }; },
    methods: {
        resetPassword() {
            this.loading = true;
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email).then(() => {
                this.modalMessage = 'If your account exists, you will receive an email.';
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                this.modalMessage = err.message;
                this.loading = false;
                this.modalActive = true;
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