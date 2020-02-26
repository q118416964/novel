import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'lib-flexible'


import {Button} from 'vant';
import 'vant/lib/index.css';



import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);

import { Lazyload } from 'vant';

Vue.use(Lazyload);

import { Toast } from 'vant';

Vue.use(Toast);

import { Popup } from 'vant';

Vue.use(Popup);

import Mui from 'vue-awesome-mui';
Vue.use(Mui);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(Button);