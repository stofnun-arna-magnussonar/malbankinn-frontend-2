<template>
  <div v-if="mainCatData" class="main-cat-page">
    <div class="main-cat-header">
      <p class="main-header" v-html="mainCatData.name[activeLanguage]"></p>
    </div>

    <div v-if="mainCatData.description || mainCatData.short_description" class="sub-cat-description" v-html="(mainCatData.description || mainCatData.short_description)[activeLanguage]"></div>

    <!-- Inline mode: show all sub-categories stacked with their items -->
    <div v-if="inlineMode" class="inline-sections">
      <template v-for="subCatKey in mainCatData.categories" :key="subCatKey">
        <div v-if="subCategories[subCatKey] && getItems(subCatKey).length > 0" :id="subCatKey" class="inline-section">
          <p class="secondary-header">{{ subCategories[subCatKey].title[activeLanguage] }}</p>
          <div
            v-if="subCategories[subCatKey].description"
            class="sub-cat-description"
            v-html="subCategories[subCatKey].description[activeLanguage]"
          ></div>
          <!-- Render nested subcategories -->
          <template v-if="subCategories[subCatKey].subcategories && subCategories[subCatKey].subcategories.length">
            <div v-for="nestedKey in subCategories[subCatKey].subcategories" :key="nestedKey" :id="nestedKey" class="inline-nested-section">
              <template v-if="subCategories[nestedKey] && getItems(nestedKey).length > 0">
                <p class="sub-header">{{ subCategories[nestedKey].title[activeLanguage] }}</p>
                <div
                  v-if="subCategories[nestedKey].description"
                  class="sub-cat-description"
                  v-html="subCategories[nestedKey].description[activeLanguage]"
                ></div>
                <ItemsContainer :items="getItems(nestedKey)" :include-about="true" :active-language="activeLanguage" />
              </template>
            </div>
          </template>
          <ItemsContainer v-else :items="getItems(subCatKey)" :include-about="true" :active-language="activeLanguage" />
        </div>
      </template>
    </div>

    <!-- Card mode: show cards linking to each sub-category page -->
    <div v-else class="sub-cats-grid">
      <template v-for="subCatKey in visibleCategories" :key="subCatKey">
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
              v-if="mainCategories[subCatKey].short_description || mainCategories[subCatKey].description"
              class="card-desc-text"
              v-html="(mainCategories[subCatKey].short_description || mainCategories[subCatKey].description)[activeLanguage]"
            ></div>
          </div>
        </RouterLink>
        <!-- Regular card: links to a sub-category page -->
        <RouterLink
          v-else
          class="hoverable-main-container lt-item-container regular-text sub-cat-card"
          :to="`/${$route.params.lang}/malfong/${subCatKey}`"
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

const INLINE_CATS = ['ordabaekur', 'mallysingar', 'stodtol', 'utanadomandi_malheildir', 'utanadomandi_ordabaekur', 'malheild_undirflokkur']

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
      return this.$route.params.cat
    },
    mainCatData() {
      return this.mainCategories[this.mainCatKey] || null
    },
    inlineMode() {
      return INLINE_CATS.includes(this.mainCatKey)
    },
    visibleCategories() {
      if (!this.mainCatData) return []
      return this.mainCatData.categories.filter(key => this.mainCategories[key] || this.hasVisibleItems(key))
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
      const filter = this.globalConfigStore.selectedFilter
      const keys = this.buildItemSet(subCatKey)
      return [...keys]
        .map(key => this.repoItems[key])
        .filter(item => {
          if (!item) return false
          if (!filter || !item.audience) return true
          return item.audience.includes(filter)
        })
    },
    buildItemSetDeep(key, visited = new Set()) {
      if (visited.has(key)) return new Set()
      visited.add(key)
      const mainCat = mainCategories[key]
      if (mainCat) {
        const all = new Set()
        ;(mainCat.categories || []).forEach(sub => {
          this.buildItemSetDeep(sub, visited).forEach(i => all.add(i))
        })
        return all
      }
      return this.buildItemSet(key)
    },
    hasVisibleItems(key) {
      const filter = this.globalConfigStore.selectedFilter
      const keys = this.buildItemSetDeep(key)
      return [...keys].some(k => {
        const item = this.repoItems[k]
        if (!item) return false
        if (!filter || !item.audience) return true
        return item.audience.includes(filter)
      })
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

.inline-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inline-nested-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.sub-cat-description {
  max-width: 800px;
}

.sub-header {
  font-size: 24px;
  font-family: 'RecklessMedium';
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

@media (max-width: 1024px) {
  .sub-cats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
