<template>
    <div class="auth-nav">
        <div class="auth-branding">
            <router-link class="header" :to="{ name: 'Home' }">Blog</router-link>
        </div>
    </div>
    <div class="auth-background">
        <div class="form-wrap">
            <form class="login">
                <p class="login-register">
                    Don't have an account?
                    <RouterLink class="router-link" :to="{ name: 'Register' }">
                        Register
                    </RouterLink>
                </p>
                <h2>Login to Blog</h2>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="e-mail" v-model="email">
                        <email class="icon" />
                    </div>
                    <div class="input">
                        <input type="password" placeholder="password" v-model="password">
                        <password class="icon" />
                    </div>
                    <div v-show="error" class="error">{{ this.errorMsg }}</div>
                </div>
                <RouterLink class="forgot-password" :to="{ name: 'ForgotPassword' }">
                    Forgot your password?
                </RouterLink>
                <button @click.prevent="signIn">Sign In</button>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import email from '../assets/icons/envelope.svg';
import password from '../assets/icons/lock.svg';
export default {
    name: 'Login',
    components: { email, password },
    data() { return { email: '', password: '', errorMsg: '', error: null }; },
    methods: {
        signIn() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
                this.$router.push({ name: 'Home' });
                this.errorMsg = '';
                this.error = false;
            }).catch(err => {
                this.errorMsg = err.message;
                this.error = true;
            });
        }
    }
};
</script>

<style lang="scss">
.auth-nav {
    display: flex;
    justify-content: center;
    position: absolute;
    padding: 0 25px;
    width: 100%;
    top: 0;

    .auth-branding {
        width: 100%;
        max-width: calc(1440px + 1%);

        .header {
            position: absolute;
            text-decoration: none;
            font-weight: 600;
            font-size: 24px;
            color: #000;
            margin-top: 15px;
            z-index: 1;
        }
    }

    @media screen and (max-width: 750px) {
        .auth-branding .header {
            margin-top: 10px;
        }
    }
}

.auth-background {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url(/assets/images/blog/background.png);
    overflow: auto;
}

.form-wrap {
    display: flex;
    justify-content: center;
    min-height: 100%;
    width: 100%;

    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        flex: 2;

        @media (min-width: 940px) {
            padding: 0 50px;
            flex: 1;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: var(--blog-clr);
            margin-bottom: 40px;

            @media (min-width: 750px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    border-radius: 5px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 9px;
                }
            }
        }

        .forgot-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0;
            border-bottom: 1px solid transparent;
            transition: .5s ease border-color;

            &:hover {
                border-color: var(--blog-clr);
            }
        }
    }

    .background {
        display: none;
        position: relative;
        flex: 2;
        width: 100%;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            height: 150%;
            top: -100px;
            right: 95%;
            width: 50%;
            background-color: #fff;
            transform: rotate(3deg);
        }

        @media (min-width: 750px) {
            display: initial;
        }
    }
}
</style>