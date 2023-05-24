<template>
    <div class="admin">
        <div class="container">
            <h2 lang-tag="administration">{{ lang_blog[lang]['administration'] }}</h2>
            <div class="admin-info">
                <h2 lang-tag="add">{{ lang_blog[lang]['add'] }}</h2>
                <div class="input">
                    <input :placeholder="lang_blog[lang]['enter']" lang-tag="enter" type="text" id="addAdmins" v-model="adminEmail" />
                </div>
                <span>{{ this.functionMsg }}</span>
                <button @click="addAdmin" class="button" lang-tag="submit">{{ lang_blog[lang]['submit'] }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { lang_blog, getLangBlog } from '../lang';
export default {
    name: 'Admin',
    data() { return { lang_blog, lang: getLangBlog(), adminEmail: '', functionMsg: null } },
    methods: { addAdmin() { } }
};
</script>

<style lang="scss" scoped>
.admin {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .admin-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            span {
                font-size: 14px;
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
                    padding: 8px;
                    height: 50px;
                    border-radius: 5px;
                    outline: none;
                }
            }

            button {
                align-self: center;
            }
        }
    }
}
</style>