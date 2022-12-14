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
            </div>
            <button>Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import user from '../assets/icons/user-alt-light.svg';
import email from '../assets/icons/envelope-regular.svg';
import password from '../assets/icons/lock-alt-solid.svg';
export default {
    name: 'Register',
    components: { user, email, password },
    data() {
        return {
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            password: null
        };
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