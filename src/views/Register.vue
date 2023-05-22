<template>
    <div class="auth-nav">
        <div class="auth-branding">
            <router-link class="header" :to="{ name: 'Home' }">Blog</router-link>
        </div>
    </div>
    <div class="auth-background">
        <div class="form-wrap">
            <form class="register">
                <p class="login-register">
                    <span lang-tag="already">{{ lang_blog[lang]['already'] }}</span>&nbsp;
                    <RouterLink class="router-link" :to="{ name: 'Login' }" lang-tag="login">
                        {{ lang_blog[lang]['login'] }}
                    </RouterLink>
                </p>
                <h2 lang-tag="create_account">{{ lang_blog[lang]['create_account'] }}</h2>
                <div class="inputs">
                    <div class="input">
                        <input type="text" :placeholder="lang_blog[lang]['first_name']" v-model="firstName" lang-tag="first_name">
                        <user class="icon" />
                    </div>
                    <div class="input">
                        <input type="text" :placeholder="lang_blog[lang]['last_name']" v-model="lastName" lang-tag="last_name">
                        <user class="icon" />
                    </div>
                    <div class="input">
                        <input type="text" :placeholder="lang_blog[lang]['username']" v-model="username" lang-tag="username">
                        <user class="icon" />
                    </div>
                    <div class="input">
                        <input type="email" :placeholder="lang_blog[lang]['email']" v-model="email" lang-tag="email">
                        <email class="icon" />
                    </div>
                    <div class="input">
                        <input type="password" :placeholder="lang_blog[lang]['password']" v-model="password" lang-tag="password">
                        <password class="icon" />
                    </div>
                    <div v-show="error" class="error" :lang-tag="lang_tag">{{ this.errorMsg }}</div>
                </div>
                <button @click.prevent="register" lang-tag="sign_up">{{ lang_blog[lang]['sign_up'] }}</button>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import user from '../assets/icons/user.svg';
import email from '../assets/icons/envelope.svg';
import password from '../assets/icons/lock.svg';
import db from '../firebase/init';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Register',
    components: { user, email, password },
    data() {
        return {
            lang: getLangBlog(),
            lang_blog,
            lang_tag: null,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            errorMsg: '',
            error: null
        };
    },
    methods: {
        async register() {
            if (this.email !== '' &&
                this.password !== '' &&
                this.firstName !== '' &&
                this.lastName !== '' &&
                this.username !== '') {
                this.errorMsg = '';
                this.lang_tag = null;
                this.error = false;
                try {
                    const auth = getAuth();
                    const result = await createUserWithEmailAndPassword(auth, this.email, this.password);
                    await setDoc(doc(db, 'users', result.user.uid), {
                        firstname: this.firstName,
                        lastname: this.lastName,
                        username: this.username,
                        email: this.email
                    });
                    this.$router.push({ name: 'Home' });
                } catch (e) {
                    this.errorMsg = e.message;
                    this.lang_tag = null;
                    this.error = true;
                }
                return;
            }
            this.errorMsg = lang_blog[this.lang]['fill'];
            this.lang_tag = 'fill';
            this.error = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}
</style>