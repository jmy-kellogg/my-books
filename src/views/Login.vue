<template>
  <div class="login-container">
    <div class="login">
      <el-form>
        <h1>Login</h1>
        <el-input type="text" name="username" v-model="input.username" placeholder="Username"/>
        <el-input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <el-button v-on:click="login()">Login</el-button>
      </el-form>
    </div>
    <div class="login">
      <el-carousel height="100vh">
        <el-carousel-item v-for="book in books" :key="book.id">
          <img :src="book.image_url" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState(['books']),
  },
  methods: {
    async login() {
      if (this.input.username !== '' && this.input.password !== '') {
        await this.$store.dispatch('login', { username: this.input.username, password: this.input.password });
        this.$router.replace({ name: 'home' });
      } else {
        this.$store.commit('SETMESSAGE', {
          message: 'A username and password must be present',
          type: 'warning',
        });
      }
    },
  },
};
</script>
<style scoped>
.el-form {
  width: 60%;
  height: 50%;
  margin: auto;
}

.el-input {
  margin: 10px;
}

.el-button {
  margin: 10px;
  background-color: #72e082;
  color: black;
}

.el-button:hover {
  color: white;
}

.image {
  width: auto;
  height: auto;
}

.login {
  display: block;
  overflow: auto;
  width: 50vw;
  margin: auto;
}

.login-container {
  display: flex;
}

.book-content {
  text-align: left;
  white-space: pre-wrap;
}
</style>
