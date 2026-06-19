<template>
  <MainCategoryView v-if="isMainCategory" />
  <SubCategoryPageView v-else />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import mainCategories from '@/data/mainCat.json'

export default {
  name: 'MalfongView',
  components: {
    MainCategoryView: defineAsyncComponent(() => import('./MainCategoryView.vue')),
    SubCategoryPageView: defineAsyncComponent(() => import('./SubCategoryPageView.vue')),
  },
  computed: {
    isMainCategory() {
      return !!mainCategories[this.$route.params.cat]
    }
  }
}
</script>
