<template>
  <div class="news-container">
    <div class="news-item-container" v-for="n in news">
      <div class="news-item">
        <div class="news-header">
          <p class="blue-text news-date">{{ n.date }}</p>
          <p class="news-title">{{ n.title }}</p>
        </div>
        <p class="news-content" v-html="n.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import news from '@/data/news.json';
export default {
  name: 'News',
  data() {
    return {
      news: news
    }
  },
}


</script>

<style scoped>
.news-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.news-item {
  background-color: var(--bright-vream);
  padding: 32px;
  border-radius: 16px;
}
.news-header {
  gap: 10px;
  align-items: baseline;
}
.news-title {
  font-size: 1.2rem;
  font-family: 'RecklessMedium';
}
.news-date {
  font-size: 0.8rem;
  width: 112px;
  color: var(--medium-grey);
}
</style>