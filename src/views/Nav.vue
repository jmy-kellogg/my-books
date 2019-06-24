<template>
  <el-menu
    :default-active="category"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="all">All</el-menu-item>
    <el-menu-item
      :index="item.id"
      :key="item.id"
      v-for="item in categories"
    >{{ item.title }}</el-menu-item>
    <el-menu-item index="logout">Logout</el-menu-item>

  </el-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Nav',
  computed: {
    ...mapState(['activeIndex', 'categories']),
    category() {
      return this.$route.params.id || 'all';
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({ name: 'login' });
    },
    handleSelect(index) {
      if (!index || index === 'all') {
        this.$router.push({ path: '/discovery/all' });
      } else if (index === 'logout') {
        this.logout();
      } else {
        this.$router.push({ path: `/discovery/${index}` });
      }
    },
  },
};
</script>
<style>
</style>
