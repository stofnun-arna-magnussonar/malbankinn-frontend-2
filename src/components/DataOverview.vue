<template>
  <div class="data-overview-outer-container">

  
    <div class="data-overview-container">
      <div class="main-category" v-for="mainCategory in mainCategories">
        <div class="main-category-name" 
              @click="handleMainCategoryClick(mainCategory.name)">
            <p class="main-category-name-text">{{ mainCategory.name }}</p>
            <p :class="{ rotated: openMainCategories.includes(mainCategory.name) }">▸</p>
          </div>

        <Transition name="category-slide">

          <div v-if="openMainCategories.includes(mainCategory.name)" class="categories">
            <div @click="handleCategoryClick(categories[category].name)" class="category-container" :class="{ 'open-category-container': openCategories.includes(categories[category].name) }"
                 v-for="category in mainCategory.categories">
                 <div class="category-name">
                   <p v-html="categories[category].name"></p>
                   <p :class="{ rotated: openCategories.includes(categories[category].name) }">▸</p>
                 </div>
              <Transition name="category-slide">
                <div v-if="openCategories.includes(categories[category].name)" class="category">
                  <p class="category-description" v-html="categories[category].description"></p>
                  <div class="subcategories-container">
                    <div class="subcategory-container" v-for="subCategory in categories[category].subcategories">
                      <p class="subcategory-name" v-html="categories[subCategory].name"></p>
                      <ItemsContainer :items="buildItems(categories[subCategory].items)" />
                    </div>

                  </div>
                  <ItemsContainer :items="buildItems(categories[category].items)" />
                </div>
              </Transition>
            </div>

          </div>
        </Transition>
        <!-- {{ mainCategory }} -->
      </div>
      <!-- <div v-for="parentCategory in testData">
        <p class="parent-category-name">{{ parentCategory.name }}</p>
        <div class="category-container" v-for="category in parentCategory.categories">
          <p class="category-name"> {{ categories[category].name }} </p>
          <p class="category-description" v-html="categories[category].description"></p>
          
          <div class="category-container" v-for="subcategory in categories[category].subcategories">
            <p class="category-name"> {{ subcategory.name }} </p>
            <div class="item" v-for="item in subcategory.items">
              <div class="item-name-container">
                <p class="item-name-bullet"> • </p>
                <p class="item-name"> {{ items[item].name }} </p>
              </div>
              
              <div class="item-version-links" v-for="versionLink, index in items[item].links">
                <div class="item-version-link">
                  <a :href="versionLink.url" target="_blank">{{ versionLink.name }}</a>
                  <p v-if="index < items[item].links.length - 1">|</p>
                </div>
              </div>
              <a class="item-link" v-if="items[item].infoUrl" :href="items[item].infoUrl" target="_blank">ℹ️</a>
              <a class="item-link" v-if="items[item].searchUrl" :href="items[item].searchUrl" target="_blank">🔎</a>
            </div>
          </div>

        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import { testData, categories, items } from '@/data/test-data-overview.js'
import repoItems from '@/data/repo_items_v2.json'
import mainCategories from '@/data/mainCat.json'
import categories from '@/data/subCat.json'
import ItemsContainer from '@/components/ItemsContainer.vue'
export default {
  components: {
    ItemsContainer
  },
  data() {
    return {
      showModal: true,
      hoveredTooltip: null,
      repoItems: repoItems,
      mainCategories: mainCategories,
      categories: categories,
      openCategories: [],
      openMainCategories: []
    }
  },
  methods: {
    handleCategoryClick(cat) {
      if (this.openCategories.includes(cat)) {
        this.openCategories = this.openCategories.filter(c => c !== cat)
      } else {
        this.openCategories.push(cat)
      }
    },
    handleMainCategoryClick(cat) {
      if (this.openMainCategories.includes(cat)) {
        this.openMainCategories = this.openMainCategories.filter(c => c !== cat)
      } else {
        this.openMainCategories.push(cat)
      }
    },
    buildItems(items) {
      return items.map(item => this.repoItems[item]);
    }
  }
}

</script>

<style scoped>
.data-overview-outer-container  {

}
.main-category-name p:last-child {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.category-name p:last-child {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.rotated {
  transform: rotate(90deg);
}
.data-overview-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: 100%;
}

.main-category-name {
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 25px;
  background-color: white;
  display: flex;
  gap: 10px;
}

.main-category-name-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


.main-category-name:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}


.parent-category-name {
  font-size: 1.5rem;
}

.category {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  display: flex;
  gap: 5px;
}

.item-version-link {
  display: flex;
  gap: 2px;
}


.categories {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.category-name {
  font-size: 1rem;
  display: flex;
  gap: 5px;
  font-weight: 300;
  cursor: pointer;
  background-color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.category-name:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.category-container {
  padding: 25px;
}

.category-container {
  border-radius: 10px;
  cursor: pointer;
}

.subcategory {
  height: 100%;
}

.open-category-container {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.subcategories-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>