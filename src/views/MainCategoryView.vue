<template>
  <div v-if="mainCatData" class="main-cat-page">
    <div class="main-cat-header">
      <p class="main-header" v-html="mainCatData.name[activeLanguage]"></p>
    </div>

    <div v-if="mainCatData.description || mainCatData.short_description" class="sub-cat-description" v-html="(mainCatData.description || mainCatData.short_description)[activeLanguage]"></div>

    <!-- Inline mode: show all sub-categories stacked with their items -->
    <div v-if="inlineMode" class="inline-sections">
      <div v-for="subCatKey in mainCatData.categories" :key="subCatKey" class="inline-section">
        <div v-if="subCategories[subCatKey]">
          <p class="secondary-header">{{ subCategories[subCatKey].title[activeLanguage] }}</p>
          <div
            v-if="subCategories[subCatKey].description"
            class="sub-cat-description"
            v-html="subCategories[subCatKey].description[activeLanguage]"
          ></div>
          <ItemsContainer :items="getItems(subCatKey)" :include-about="true" :active-language="activeLanguage" />
        </div>
      </div>
    </div>

    <!-- Card mode: show cards linking to each sub-category page -->
    <div v-else class="sub-cats-grid">
      <template v-for="subCatKey in mainCatData.categories" :key="subCatKey">
        <!-- Folder card: links to a main category overview page -->
        <RouterLink
          v-if="mainCategories[subCatKey]"
          class="hoverable-main-container lt-item-container regular-text sub-cat-card"
          :to="`/${$route.params.lang}/malfong/${subCatKey}`"
        >
          <div class="main-category-name-container language-technology-name-container">
            <p class="secondary-header">{{ mainCategories[subCatKey].name[activeLanguage] }}</p>
          </div>
          <div class="card-description">
            <div
              v-if="mainCategories[subCatKey].short_description"
              class="card-desc-text"
              v-html="mainCategories[subCatKey].short_description[activeLanguage]"
            ></div>
          </div>
        </RouterLink>
        <!-- Regular card: links to a sub-category page -->
        <RouterLink
          v-else
          class="hoverable-main-container lt-item-container regular-text sub-cat-card"
          :to="`/${$route.params.lang}/mali/${subCatKey}`"
        >
          <div class="main-category-name-container language-technology-name-container">
            <p class="secondary-header">{{ subCategories[subCatKey]?.title[activeLanguage] ?? subCatKey }}</p>
          </div>
          <div class="card-description">
            <div
              v-if="subCategories[subCatKey]?.short_description"
              class="card-desc-text"
              v-html="subCategories[subCatKey].short_description[activeLanguage]"
            ></div>
            <div
              v-else-if="subCategories[subCatKey]?.description"
              class="card-desc-text"
              v-html="subCategories[subCatKey].description[activeLanguage]"
            ></div>
          </div>
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
import mainCategories from '@/data/mainCat.json'
import subCategories from '@/data/subCat.json'
import repoItems from '@/data/repo_items_v2.json'
import ItemsContainer from '@/components/ItemsContainer.vue'
import { useGlobalConfigStore } from '@/stores/globalConfig'

const INLINE_CATS = ['ordabaekur', 'mallysingar', 'stodtol']

export default {
  name: 'MainCategoryView',
  components: { ItemsContainer },
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      mainCategories,
      subCategories,
      repoItems,
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    mainCatKey() {
      return this.$route.params.maincat
    },
    mainCatData() {
      return this.mainCategories[this.mainCatKey] || null
    },
    inlineMode() {
      return INLINE_CATS.includes(this.mainCatKey)
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
    getItems(subCatKey) {
      const keys = this.buildItemSet(subCatKey)
      return Object.entries(this.repoItems)
        .filter(([key]) => keys.has(key))
        .map(([, value]) => value)
    }
  }
}
</script>

<style scoped>
.main-cat-page {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.inline-sections {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.inline-section > div {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sub-cat-description {
  max-width: 800px;
}

.sub-cats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}

.sub-cat-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.card-description {
  display: flex;
  flex-direction: column;
}

.card-desc-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.language-technology-name-container {
  width: 100%;
  border-radius: 5px;
  border-bottom: none;
}

@media (max-width: 1180px) {
  .sub-cats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .sub-cats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
