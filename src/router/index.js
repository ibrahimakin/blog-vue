import { createRouter, createWebHashHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import Home from '../views/Home.vue';
import Blog from '../views/Blog.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import CreatePost from '../views/CreatePost.vue';
import PreviewPost from '../views/PreviewPost.vue';
import ViewPost from '../views/ViewPost.vue';
import EditPost from '../views/EditPost.vue';
import store from '../store';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                noauth: true,
                title: 'Login'
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                noauth: true,
                title: 'Register'
            }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                noauth: true,
                title: 'Forgot Password'
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                auth: true,
                title: 'Profile'
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: {
                auth: true,
                admin: true,
                title: 'Admin'
            }
        },
        {
            path: '/create',
            name: 'CreatePost',
            component: CreatePost,
            meta: {
                auth: true,
                admin: true,
                title: 'Create Post'
            }
        },
        {
            path: '/preview',
            name: 'PreviewPost',
            component: PreviewPost,
            meta: {
                auth: true,
                admin: true,
                title: 'Preview'
            }
        },
        {
            path: '/view/:id',
            name: 'ViewPost',
            component: ViewPost
        },
        {
            path: '/edit/:id',
            name: 'EditPost',
            component: EditPost,
            meta: {
                auth: true,
                admin: true,
                title: 'Edit'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) document.title = `${to.meta.title} | Blog`;
    else document.title = 'Blog';
    next();
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.noauth && getAuth().currentUser) return next({ name: 'Home' });
    if (to.matched.some(res => res.meta.auth)) {
        let user = getAuth().currentUser;
        if (user) {
            if (to.matched.some(res => res.meta.admin)) {
                if (!store.state.id) await store.dispatch('getCurrentUser', user);
                if (store.state.admin) return next();
                return next({ name: 'Home' });
            }
            return next();
        }
        return next({ name: 'Home' });
    }
    return next();
});

export default router;