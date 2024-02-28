<template>
    <div class="form-wrap">
        <form class="login">
            <p class="login-register">
                <span lang-tag="account">{{ lang_blog[lang]['account'] }}</span>&nbsp;
                <RouterLink class="router-link" :to="{ name: 'Register' }" lang-tag="register">
                    {{ lang_blog[lang]['register'] }}
                </RouterLink>
            </p>
            <h2 lang-tag="login_blog">{{ lang_blog[lang]['login_blog'] }}</h2>
            <div class="inputs">
                <div class="input">
                    <input type="email" :placeholder="lang_blog[lang]['email']" v-model="email" lang-tag="email" ref="input">
                    <email class="icon" />
                </div>
                <div class="input">
                    <input type="password" :placeholder="lang_blog[lang]['password']" v-model="password" lang-tag="password">
                    <password class="icon" />
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>
            <RouterLink class="forgot-password" :to="{ name: 'ForgotPassword' }" lang-tag="forgot">
                {{ lang_blog[lang]['forgot'] }}
            </RouterLink>
            <button @click.prevent="signIn" lang-tag="sign_in">{{ lang_blog[lang]['sign_in'] }}</button>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import email from '../assets/icons/envelope.svg';
import password from '../assets/icons/lock.svg';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Login',
    components: { email, password },
    data() { return { lang_blog, lang: getLangBlog(), email: '', password: '', errorMsg: '', error: null }; },
    mounted() { this.$refs.input.focus(); },
    methods: {
        signIn() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
                this.$router.push({ name: 'Home' });
                this.errorMsg = '';
                this.error = false;
            }).catch(e => {
                this.errorMsg = e.code.split('/')[1].replaceAll('-', ' ');
                this.error = true;
            });
        }
    }
};
</script>

<style lang="scss">
.form-wrap {
    display: flex;
    justify-content: center;
    padding-left: var(--sidenav-width);
    min-height: 100%;
    width: 100%;

    .login-register {
        margin: 45px 0 32px 0;
        text-align: center;

        .router-link {
            color: #000;
            position: relative;
            z-index: 2;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 2;

        @media (min-width: 1050px) {
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
            position: relative;

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
            text-align: center;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 20px 0 0;
            border-bottom: 1px solid transparent;
            transition: .5s ease border-color;

            &:hover {
                border-color: var(--blog-clr);
            }
        }

        button {
            margin-bottom: 45px;
        }
    }

    .background {
        display: none;
        position: relative;
        flex: 2;
        width: 100%;
        overflow: hidden;
        background-image: url(/assets/images/blog/background.png);
        background-size: cover;

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