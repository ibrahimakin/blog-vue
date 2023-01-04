<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <RouterLink class="router-link" :to="{ name: 'Login' }">
                    Login
                </RouterLink>
            </p>
            <h2>Create Your Blog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <user class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <user class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username">
                    <user class="icon" />
                </div>
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
            <button @click.prevent="register">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import user from '../assets/icons/user-alt-light.svg';
import email from '../assets/icons/envelope-regular.svg';
import password from '../assets/icons/lock-alt-solid.svg';
import db from '../firebase/init';
export default {
    name: 'Register',
    components: { user, email, password },
    data() {
        return {
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
                this.error = false;
                const auth = await getAuth();
                const result = await createUserWithEmailAndPassword(auth, this.email, this.password);
                await setDoc(doc(db, 'users', result.user.uid), {
                    firstname: this.firstName,
                    lastname: this.lastName,
                    username: this.username,
                    email: this.email
                });
                this.$router.push({ name: 'Home' });
                return;
            }
            this.errorMsg = 'Please fill out all the fields!';
            this.error = true;
            return;
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