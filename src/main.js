import Vue from 'vue';
import ElementUI from 'element-ui';
import { VueMasonryPlugin } from 'vue-masonry';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueMasonryPlugin);

Vue.mixin({
  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.replace({ name: 'login' });
    }
  },
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
