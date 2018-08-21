import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import '@/css/master';

// Vue.config.productionTip = false;
// Vue.config.devtools = true;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
