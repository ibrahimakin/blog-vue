<template>
    <div class="profile">
        <div class="container">
            <h2 lang-tag="account_settings">{{ lang_blog[lang]['account_settings'] }}</h2>
            <div class="profile-info">
                <div class="initials">{{ $store.state.initials }}</div>
                <div class="admin-badge" v-if="this.$store.state.admin">
                    <Admin class="icon" />
                    <span lang-tag="admin_t">{{ lang_blog[lang]['admin_t'] }}</span>
                </div>
                <div class="input">
                    <label for="firstname" lang-tag="first_name_t">{{ lang_blog[lang]['first_name_t'] }}</label>
                    <input type="text" id="firstname" v-model="firstname" />
                </div>
                <div class="input">
                    <label for="lastname" lang-tag="last_name_t">{{ lang_blog[lang]['last_name_t'] }}</label>
                    <input type="text" id="lastname" v-model="lastname" />
                </div>
                <div class="input">
                    <label for="username" lang-tag="username_t">{{ lang_blog[lang]['username_t'] }}</label>
                    <input type="text" id="username" v-model="username" />
                </div>
                <div class="input">
                    <label for="email" lang-tag="email">{{ lang_blog[lang]['email'] }}</label>
                    <input disabled type="email" id="email" v-model="email" />
                </div>
                <button @click="updateProfile" lang-tag="save">{{ lang_blog[lang]['save'] }}</button>
            </div>
        </div>
        <Modal v-if="modalActive" :message="modalMessage" v-on:close-modal="close" lang_tag="saved" />
    </div>
</template>

<script>
import Admin from '../assets/icons/user-crown.svg';
import Modal from '../components/Modal.vue';
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Profile',
    components: { Admin, Modal },
    data() {
        const lang = getLangBlog();
        return {
            lang_blog, lang, modalActive: null,
            modalMessage: lang_blog[lang]['saved']
        };
    },
    methods: {
        updateProfile() {
            this.$store.dispatch('updateUser');
            this.modalActive = !this.modalActive;
        },
        close() { this.modalActive = !this.modalActive; }
    },
    computed: {
        firstname: {
            get() { return this.$store.state.firstname; },
            set(payload) { this.$store.commit('changeFirstName', payload); }
        },
        lastname: {
            get() { return this.$store.state.lastname; },
            set(payload) { this.$store.commit('changeLastName', payload); }
        },
        username: {
            get() { return this.$store.state.username; },
            set(payload) { this.$store.commit('changeUsername', payload); }
        },
        email() { return this.$store.state.email; }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .initials {
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: var(--blog-clr);
                color: #fff;
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .admin-badge {
                display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: var(--blog-clr);
                margin: 16px 0;
                text-align: center;

                .icon {
                    width: 14px;
                    height: auto;
                    margin-right: 8px;
                }
            }

            .input {
                margin: 16px 0;

                label {
                    font-size: 14px;
                    display: block;
                    padding-bottom: 6px;
                }

                input {
                    width: 100%;
                    border: none;
                    background-color: #fbfbfb;
                    border-radius: 5px;
                    padding: 8px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }
            }

            button {
                align-self: center;
            }
        }
    }
}
</style>