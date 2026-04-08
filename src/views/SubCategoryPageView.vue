<template>
  <div v-if="subCategoryData" class="sub-category-page">
    <div class="sub-cat-header">
      <p class="main-header">{{ subCategoryData.title[activeLanguage] }}</p>
      <div v-if="subCategoryData.description" v-html="subCategoryData.description[activeLanguage]" class="sub-cat-description"></div>
    </div>

    <!-- If subcategories exist, render each as a section -->
    <template v-if="subCategoryData.subcategories && subCategoryData.subcategories.length">
      <div v-for="subKey in subCategoryData.subcategories" :key="subKey" class="sub-section">
        <div v-if="subCategories[subKey]">
          <p class="secondary-header">{{ subCategories[subKey].title[activeLanguage] }}</p>
          <div
            v-if="subCategories[subKey].description"
            class="sub-cat-description"
            v-html="subCategories[subKey].description[activeLanguage]"
          ></div>
          <ItemsContainer :items="getItems(subKey)" :include-about="true" :active-language="activeLanguage" />
        </div>
      </div>
      <!-- Also render any direct items -->
      <ItemsContainer v-if="directItems.length" :items="directItems" :include-about="true" :active-language="activeLanguage" />
    </template>

    <!-- No subcategories: flat list -->
    <ItemsContainer v-else :items="items" :include-about="true" :active-language="activeLanguage" />
  </div>
</template>

<script>
import repoItems from '@/data/repo_items_v2.json'
import subCategories from '@/data/subCat.json'
import ItemsContainer from '@/components/ItemsContainer.vue'
import { useGlobalConfigStore } from '@/stores/globalConfig'

export default {
  name: 'SubCategoryPageView',
  components: { ItemsContainer },
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      subCategories,
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    subCatKey() {
      return this.$route.params.subcat
    },
    subCategoryData() {
      return subCategories[this.subCatKey] || null
    },
    directItems() {
      const keys = new Set(subCategories[this.subCatKey]?.items || [])
      return Object.entries(repoItems)
        .filter(([key]) => keys.has(key))
        .map(([, value]) => value)
    },
    items() {
      const itemKeys = this.buildItemSet(this.subCatKey)
      return Object.entries(repoItems)
        .filter(([key]) => itemKeys.has(key))
        .map(([, value]) => value)
    }
  },
  methods: {
    buildItemSet(key) {
      if (!subCategories[key]) return new Set()
      const items = new Set(subCategories[key].items || [])
      if (subCategories[key].subcategories) {
        subCategories[key].subcategories.forEach(nested => {
          this.buildItemSet(nested).forEach(item => items.add(item))
        })
      }
      return items
    },
    getItems(key) {
      const keys = this.buildItemSet(key)
      return Object.entries(repoItems)
        .filter(([k]) => keys.has(k))
        .map(([, value]) => value)
    }
  }
}
</script>

<style scoped>
.sub-category-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sub-cat-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sub-cat-description {
  max-width: 800px;
}

.sub-section > div {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
