import Vue from 'vue';
import App from './App';
import router from './router';


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
