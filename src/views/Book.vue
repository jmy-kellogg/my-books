<template>
  <div class="book-container">
    <img :src="book.image_url" class="image">
    <div class="book-info">
      <h1>{{ book.title }}</h1>
      <div v-if="isPremium" class="book-content">{{ book.content }}</div>
      <div v-else>
        <div class="book-content">{{ freeContent(book.content) }}</div>
        <el-button>Subscribe to Read More!</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Book',
  data() {
    return {
      book: {},
    };
  },
  mounted() {
    this.fetchBook();
  },
  computed: mapGetters(['isPremium']),
  methods: {
    async fetchBook() {
      try {
        const { data } = await axios.get(
          `https://ancient-springs-73658.herokuapp.com/books/${
            this.$route.params.id
          }`,
        );
        this.book = data;
      } catch (error) {
        this.$store.commit('SETMESSAGE', {
          message:
            'Something went wrong loading your book. Please try to refresh',
          type: 'warning',
        });
      }
    },
    freeContent(content) {
      let text = content.slice(0, content.length / 2);
      text += '.....';
      return text;
    },
  },
};
</script>
<style scoped>
.image {
  display: block;
  max-height: calc(100vh - 62px);
  width: auto;
  height: auto;
}

.book-info {
  display: block;
  overflow: auto;
  margin: auto;
  max-height: calc(100vh - 62px);
  max-width: 500px;
  width: auto;
  height: auto;
  padding: 20px;
}

.book-container {
  display: flex;
  flex-flow: row wrap;
}

.book-content {
  text-align: left;
  white-space: pre-wrap;
}

.el-button {
  margin: 20px;
  background-color: #72e082;
  color: black;
}

.el-button:hover {
  color: white;
}
</style>
