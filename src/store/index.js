import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { doc, query, collection, getDoc, getDocs, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import db from '../firebase/init';

export default createStore({
    state: {
        sampleBlogPosts: [
            {
                id: '1',
                title: 'This is a Filler Title 1!',
                html: 'This is a filler blog post title 1!',
                photo: '/src/assets/photos/beautiful-stories.jpg',
                date: 'May 1, 2021'
            },
            {
                id: '2',
                title: 'This is a Filler Title 2!',
                html: 'This is a filler blog post title 2!',
                photo: '/src/assets/photos/designed-for-everyone.jpg',
                date: 'May 1, 2021'
            },
            { id: '3', title: 'Blog Card #1', photo: '/src/assets/cards/stock-1.jpg', date: 'May 1, 2021' },
            { id: '4', title: 'Blog Card #2', photo: '/src/assets/cards/stock-2.jpg', date: 'May 1, 2021' },
            { id: '5', title: 'Blog Card #3', photo: '/src/assets/cards/stock-3.jpg', date: 'May 1, 2021' },
            { id: '6', title: 'Blog Card #4', photo: '/src/assets/cards/stock-4.jpg', date: 'May 1, 2021' }
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
        setBlogState(state, payload) {
            state.blogTitle = payload.title;
            state.blogHTML = payload.html
            state.blogPhotoFileURL = payload.photo;
            state.blogPhotoName = payload.photo_name;
        },
        filterPosts(state, payload) {
            state.blogPosts = state.blogPosts.filter(post => post.id !== payload);
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
            state.postLoaded = false;
            const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
            const result = await getDocs(q);
            result.forEach(doc => {
                if (!state.blogPosts.some(post => post.id === doc.id)) {
                    state.blogPosts.push({
                        id: doc.id,
                        html: doc.data().html,
                        title: doc.data().title,
                        photo: doc.data().cover_photo,
                        photo_name: doc.data().cover_photo_name,
                        date: doc.data().date
                    });
                }
            });
            state.postLoaded = true;
        },
        async getPost({ state }, payload) {
            const result = await getDoc(doc(db, 'details', payload.id));
            if (result.exists()) {
                payload.html = result.data().html;
                payload.loaded = true;
            }
        },
        async updatePost({ state, commit, dispatch }, payload) {
            const blog = state.blogPosts.find(post => post.id === payload);
            if (blog) {
                blog.title = state.blogTitle;
                blog.html = state.blogHTML;
                blog.photo = state.blogPhotoFileURL;
                blog.photo_name = state.blogPhotoName;
            }
        },
        async deletePost({ commit }, payload) {
            await deleteDoc(doc(db, 'posts', payload));
            commit('filterPosts', payload);
        }
    },
    getters: {
        blogPosts(state) {
            return state.blogPosts.slice(0, 2);
        },
        blogCards(state) {
            return state.blogPosts.slice(2, 6);
        },
        edit(state) {
            return state.edit;
        }
    }
});