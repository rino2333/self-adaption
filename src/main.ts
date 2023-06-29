import { createApp } from 'vue'
import './style/style.css'
import './style/atom.scss'
import App from './App.vue'
import pinia from '@/store'
import router from "./router";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import {mockXHR } from "./mock/index"
mockXHR()
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
