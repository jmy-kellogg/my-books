<template>
  <div id="app">
    <Nav v-if="isLoggedIn"/>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Nav from './views/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
  computed: {
    ...mapState(['message']),
    ...mapGetters(['isLoggedIn']),
  },
  watch: {
    message(newMessage) {
      this.$message(newMessage);
    },
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchBooks');
  },
};
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logout {
  text-align: end;
}

.logout-btn {
  font-size: 1.5em;
  margin: 10px 30px;
}
</style>
