import { createApp } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from './router';
import store from './store';
import App from './App.vue';
import './assets/base.css';

const auth = getAuth();

let app;

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App);

        app.use(router);
        
        app.use(store);
        
        app.mount('#app');
    }
});