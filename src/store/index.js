import { createStore } from 'vuex';

export default createStore({
    state: {
        sampleBlogCards: [
            { title: 'Blog Card #1', photo: 'stock-1', date: 'May 1, 2021' },
            { title: 'Blog Card #2', photo: 'stock-2', date: 'May 1, 2021' },
            { title: 'Blog Card #3', photo: 'stock-3', date: 'May 1, 2021' },
            { title: 'Blog Card #4', photo: 'stock-4', date: 'May 1, 2021' }
        ],
        edit: null
    },
    mutations: {
        toggleEdit(state, payload) {
            state.edit = payload;
        }
    },
    actions: {

    },
    getters: {
        blogPosts(state) {
            return state.sampleBlogCards;
        },
        blogCards(state) {
            return state.sampleBlogCards;
        },
        edit(state) {
            return state.edit;
        }
    }
});