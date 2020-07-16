import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';
import moment from 'moment';
import Vant from 'vant';
import 'vant/lib/index.css';
import global from './global/global.js'
import API from './global/api'

Vue.use(VueAxios, axios);
Vue.use(global);
Vue.use(Vant);
Vue.prototype.qs = qs;

Vue.prototype.api = API;
Vue.config.productionTip = false;

Vue.filter('dateFormat', function (tick) {
    return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

//开发环境
axios.defaults.baseURL = 'http://localhost:6001';
//生产环境
//axios.defaults.baseURL = 'http://inhive.net/server';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(config => {
    config.data = qs.stringify(config.data);
    return config;
}, error => {
    return Promise.reject(error)
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
