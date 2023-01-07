import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, orderBy, updateDoc } from 'firebase/firestore';
import db from '../firebase/init';

export default createStore({
    state: {
        sampleBlogCards: [
            { title: 'Blog Card #1', photo: 'stock-1', date: 'May 1, 2021' },
            { title: 'Blog Card #2', photo: 'stock-2', date: 'May 1, 2021' },
            { title: 'Blog Card #3', photo: 'stock-3', date: 'May 1, 2021' },
            { title: 'Blog Card #4', photo: 'stock-4', date: 'May 1, 2021' }
        ],
        blogPosts: [],
        postLoaded: null,
        blogHTML: 'Write your blog here...',
        blogTitle: '',
        blogPhotoName: '',
        blogPhotoFileURL: null,
        blogPhotoPreview: false,
        edit: null,
        user: null,
        admin: null,
        email: null,
        firstname: null,
        lastname: null,
        username: null,
        id: null,
        initials: null,
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload;
        },
        createFileURL(state, payload) {
            state.blogPhotoFileURL = payload;
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview;
        },
        toggleEdit(state, payload) {
            state.edit = payload;
        },
        updateUser(state, payload) {
            state.user = payload;
        },
        setAdmin(state, payload) {
            state.admin = payload;
        },
        setProfile(state, payload) {
            state.id = payload.id;
            state.email = payload.data().email;
            state.firstname = payload.data().firstname;
            state.lastname = payload.data().lastname;
            state.username = payload.data().username;
        },
        setInitials(state) {
            state.initials = state.firstname.match(/(\b\S)?/g).join('') + state.lastname.match(/(\b\S)?/g).join('');
        },
        changeFirstName(state, payload) {
            state.firstname = payload;
        },
        changeLastName(state, payload) {
            state.lastname = payload;
        },
        changeUsername(state, payload) {
            state.username = payload;
        }
    },
    actions: {
        async getCurrentUser({ commit }, user) {
            const result = await getDoc(doc(db, 'users', getAuth().currentUser.uid));
            if (result.exists()) {
                commit('setProfile', result);
                commit('setInitials');
                commit('setAdmin', result.data().admin);
            }
        },
        async updateUser({ commit, state }) {
            await updateDoc(doc(db, 'users', state.id), {
                firstname: state.firstname,
                lastname: state.lastname,
                username: state.username
            });
            commit('setInitials');
        },
        async getPosts({ state }) {
            const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
            const result = await getDocs(q);
            result.forEach(doc => {
                if (!state.blogPosts.some(post => post.id === doc.id)) {
                    console.log(doc.data());
                    state.blogPosts.push({
                        id: doc.data().id,
                        html: doc.data().html,
                        title: doc.data().title,
                        photo: doc.data().cover_photo,
                        date: doc.data().date
                    });
                }
            });
            state.postLoaded = true;
        }
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