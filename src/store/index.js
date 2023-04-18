import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { doc, query, collection, getDoc, getDocs, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import db from '../firebase/init';

export default createStore({
    state: {
        sample_blog_posts: [
            {
                id: '1',
                title: 'This is a Filler Title 1!',
                html: 'This is a filler blog post title 1!',
                photo: '/src/assets/cards/stock-0.jpg',
                date: 'May 1, 2021'
            },
            {
                id: '2',
                title: 'This is a Filler Title 2!',
                html: 'This is a filler blog post title 2!',
                photo: '/src/assets/cards/stock-1.jpg',
                date: 'May 1, 2021'
            },
            { id: '3', title: 'Blog Card #1', photo: '/src/assets/cards/stock-2.jpg', date: 'May 1, 2021' },
            { id: '4', title: 'Blog Card #2', photo: '/src/assets/cards/stock-3.jpg', date: 'May 1, 2021' },
            { id: '5', title: 'Blog Card #3', photo: '/src/assets/cards/stock-4.jpg', date: 'May 1, 2021' },
            { id: '6', title: 'Blog Card #4', photo: '/src/assets/cards/stock-5.jpg', date: 'May 1, 2021' }
        ],
        post_loaded: null,
        blog_posts: [],
        blog_title: '',
        blog_photo_name: '',
        blog_photo_url: null,
        blog_photo_preview: false,
        blog_html: 'Write your blog here...',
        firstname: null,
        lastname: null,
        username: null,
        initials: null,
        email: null,
        admin: null,
        user: null,
        edit: null,
        id: null
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blog_html = payload;
        },
        updateBlogTitle(state, payload) {
            state.blog_title = payload;
        },
        fileNameChange(state, payload) {
            state.blog_photo_name = payload;
        },
        createFileURL(state, payload) {
            state.blog_photo_url = payload;
        },
        openPhotoPreview(state) {
            state.blog_photo_preview = !state.blog_photo_preview;
        },
        toggleEdit(state, payload) {
            state.edit = payload;
        },
        setBlogState(state, payload) {
            state.blog_title = payload.title;
            state.blog_html = payload.html
            state.blog_photo_url = payload.photo;
            state.blog_photo_name = payload.photo_name;
        },
        filterPosts(state, payload) {
            state.blog_posts = state.blog_posts.filter(post => post.id !== payload);
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
            if (!state.post_loaded) {
                const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
                const result = await getDocs(q);
                result.forEach(doc => {
                    if (!state.blog_posts.some(post => post.id === doc.id)) {
                        state.blog_posts.push({
                            id: doc.id,
                            html: doc.data().html,
                            title: doc.data().title,
                            photo: doc.data().cover_photo,
                            photo_name: doc.data().cover_photo_name,
                            date: doc.data().date
                        });
                    }
                });
                state.post_loaded = true;
            }
        },
        async getPost({ state }, payload) {
            if (!payload.title) {
                if (state.post_loaded) {
                    payload.title = 'Not Found';
                    payload.notfound = true;
                    payload.loaded = true;
                    return;
                }
                let res = await getDoc(doc(db, 'posts', payload.id));
                if (res.exists()) {
                    payload.title = res.data().title;
                    payload.photo = res.data().cover_photo;
                    payload.photo_name = res.data().cover_photo_name;
                    payload.date = res.data().date;
                    state.blog_posts.push(payload);
                    res = await getDoc(doc(db, 'details', payload.id));
                    payload.html = res.data().html;
                    payload.loaded = true;
                }
                else {
                    payload.title = 'Not Found';
                    payload.notfound = true;
                    payload.loaded = true;
                    return;
                }
            }
            else if (!payload.loaded) {
                const res = await getDoc(doc(db, 'details', payload.id));
                if (res.exists()) {
                    payload.html = res.data().html;
                    payload.loaded = true;
                }
            }
        },
        async updatePost({ state, commit, dispatch }, payload) {
            const blog = state.blog_posts.find(post => post.id === payload);
            if (blog) {
                blog.title = state.blog_title;
                blog.html = state.blog_html;
                blog.photo = state.blog_photo_url;
                blog.photo_name = state.blog_photo_name;
            }
        },
        async deletePost({ commit }, payload) {
            await deleteDoc(doc(db, 'posts', payload));
            commit('filterPosts', payload);
        }
    },
    getters: {
        blogPosts(state) {
            return state.blog_posts.slice(0, 2);
        },
        blogCards(state) {
            return state.blog_posts.slice(2, 6);
        },
        edit(state) {
            return state.edit;
        }
    }
});