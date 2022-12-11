<template>
    <div class="reset-password">
        <div class="form-wrap">
            <form class="reset">
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it.</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="e-mail" v-model="email">
                        <email class="icon" />
                    </div>
                </div>
                <button>Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
        <Loading v-if="loading" />
        <Modal v-if="modalActive" v-on:close-modal="close" />
    </div>
</template>

<script>
import email from '../assets/icons/envelope-regular.svg';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';
export default {
    name: 'ForgotPassword',
    components: { email, Loading, Modal },
    data() {
        return {
            email: null,
            loading: null,
            modalActive: null,
            modalMessage: ''
        };
    },
    methods: {
        close() {
            this.modalActive = !this.modalActive;
            this.email = '';
        }
    }
};
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;

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
}
</style>