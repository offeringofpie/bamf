import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import VueTouch from 'vue2-touch-events';

import '@/css/master';

// Vue.config.productionTip = false;
// Vue.config.devtools = true;
Vue.use(VueTouch);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
