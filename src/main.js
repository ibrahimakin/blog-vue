import { createApp } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from './router';
import store from './store';
import App from './App.vue';

const auth = getAuth();
let app;

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App);
        app.use(router);
        app.use(store);
        app.mount('#root');
    }
});
/*
import { lang_blog as lang_obj } from './lang';
const buttons = [];
const langs = ['tr', 'en'];
for (let i = 0; i < 2; i++) {
    buttons.push(document.createElement('button'));
    buttons[i].setAttribute('lang-name', langs[i]);
    buttons[i].onclick = event => {
        let lang = event.target.getAttribute('lang-name');
        try { localStorage.setItem('lang', lang); } catch (e) { }
        for (const element of document.querySelectorAll('[lang-tag]')) {
            let value = lang_obj[lang][element.getAttribute('lang-tag')]
            if (element.placeholder) element.placeholder = value;
            else element.textContent = value;
        }
    };
    buttons[i].innerText = langs[i];
    buttons[i].style.zIndex = 3;
    buttons[i].style.bottom = 0;
    buttons[i].style.position = 'fixed';
    buttons[i].style.left = 70 * i + 'px';
    document.body.appendChild(buttons[i]);
}
*/