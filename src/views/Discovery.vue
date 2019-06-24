<template>
  <div v-masonry transition-duration="0.3s" item-selector=".item">
    <div v-masonry-tile class="item" :key="item.id" v-for="item in booklist">
      <el-card class="book-card" :body-style="{ padding: '0px' }">
        <img :src="item.image_url" class="image">
        <div style="padding: 14px;">
          <span>{{ item.title }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="goToBook(item.id)">Go To Book</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Discovery',
  computed: {
    ...mapState(['categories', 'books']),
    ...mapGetters(['isPremium']),
    booklist() {
      if (!this.$route.params.id || this.$route.params.id === 'all') {
        return this.books;
      }
      const categoryInfo = this.categories.find(
        category => category && category.id === this.$route.params.id,
      ) || {};
      const bookList = categoryInfo.book_ids || [];
      return bookList.map(bookId => this.books.find(book => book.id === bookId));
    },
  },
  methods: {
    goToBook(id) {
      this.$router.push({ path: `/book/${id}` });
    },
  },
};
</script>
<style scoped>
.book-card {
  width: 300px;
  height: 500px;
  margin: 10px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
