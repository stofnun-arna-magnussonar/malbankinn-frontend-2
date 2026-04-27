<template>
  <div ref="singleCategoryContainer" class="single-category-container">
    <div v-if="category === 'malheildir'" class="corpora-category-container">
      <div class="single-category-overview-container">
        <p class="main-header" v-html="categoriesOverview.corpora.title[activeLanguage]"></p>
        <p class="diff-pad-r" v-html="categoriesOverview.corpora.description[activeLanguage]"></p>
      </div>
      <div class="category-container" v-for="(corporaCategory, index) in corpora" :key="index">
        <div class="main-category-name-container corpora-name-container">
          <p class="secondary-header">{{ corporaCategory.title[activeLanguage] }}</p>
        </div>
        <p class="subcategory-description" v-if="corporaCategory.description"
          v-html="processHTMLAnchors(corporaCategory.description[activeLanguage], activeLanguage)"></p>

        <div class="corpora-items-container">
          <ItemsContainer :items="corporaCategory.corpora" :include-about="true" :clickable-titles="true"
            :active-language="activeLanguage" />
        </div>
      </div>
    </div>

    <div v-else-if="category === 'maltaeknilausnir'" class="corpora-category-container">
      <div v-if="!activeLanguageTechnologySubcategoryItems" class="corpora-category-container">
        <div class="single-category-overview-container">
          <p class="main-header" v-html="categoriesOverview.ltSolutions.title[activeLanguage]"></p>
          <p class="diff-pad-r" v-html="categoriesOverview.ltSolutions.description[activeLanguage]">
          </p>
        </div>

        <div class="language-technology-overview-container">

          <a v-for="(category, index) in languageTechnology" :key="index"
            class="hoverable-main-container lt-item-container regular-text" :href="`maltaeknilausnir/${index}`"
            @mouseover="hoveredInfoBox = index" @mouseout="hoveredInfoBox = null">
            <div class="main-category-name-container language-technology-name-container">
              <p class="secondary-header" v-html="category.title[activeLanguage]"></p>
            </div>
            <div class="subcategory-description">
              <div class="info-icon-container">
                <button class="info-icon-wrapper">
                  <img class="info-icon default-icon" src="/public/symbols/info-symbol.svg" />
                  <img class="info-icon hover-icon" src="/public/symbols/info-symbol-fill.svg" />
                </button>
              </div>
              <p class="subcategory-description" v-if="category.short_description"
                v-html="category.short_description[activeLanguage]"></p>
            </div>

          </a>
        </div>
      </div>
      <div class="activate-language-technology-subcategory" v-if="activeLanguageTechnologySubcategoryItems">
        <RouterLink :to="`/${$route.params.lang}/maltaeknilausnir`"
          class="back-button-container global-more-button regular-text">
          <p class="reckless">Máltæknilausnir↵</p>
        </RouterLink>
        <div class="single-category-overview-container">
          <p class="main-header" v-html="activeLanguageTechnologySubcategoryItems.title[activeLanguage]"></p>
          <p class="diff-pad-r" v-if="activeLanguageTechnologySubcategoryItems.description"
            v-html="activeLanguageTechnologySubcategoryItems.description[activeLanguage]"></p>
        </div>
        <div class="activate-language-technology-subcategory"
          v-for="category in activeLanguageTechnologySubcategoryItems.categories">
          <div class="category-name-grid">
            <span></span>
            <div class="secondary-header">
              <p class="secondary-header" v-html="category.name[activeLanguage]"></p>
            </div>
            <span></span>

          </div>
          <p v-if="category.description" v-html="category.description[activeLanguage]">
          </p>
          <ItemsContainer :items="buildItems(category.items)" :include-about="true" :active-language="activeLanguage" />
        </div>
      </div>


    </div>

    <div class="corpora-category-container" v-else-if="category === 'verkfaeri'">

      <div class="single-category-overview-container">
        <p class="main-header" v-html="tools.grunnverkfaeri.title[activeLanguage]"></p>
        <p class="diff-pad-r" v-if="tools.grunnverkfaeri.description"
          v-html="processHTMLAnchors(tools.grunnverkfaeri.description[activeLanguage], activeLanguage)"></p>
      </div>
      <div class="language-technology-overview-container tools-overview-container">
        <a v-for="(item, index) in tools.grunnverkfaeri.categories[0].items" :key="index"
          class="hoverable-main-container lt-item-container regular-text" :href="item.url" target="_blank"
          @mouseover="hoveredInfoBox = index" @mouseout="hoveredInfoBox = null">
          <div class="main-category-name-container language-technology-name-container">
            <p class="secondary-header" v-html="item.title[activeLanguage]"></p>
          </div>
          <div class="subcategory-description">
            <p class="category-description no-box-shadow" v-if="item.description"
              v-html="item.description[activeLanguage]"></p>
          </div>
        </a>
      </div>

      <div class="other-tools-container">
        <h3 class="secondary-header" v-html="tools.erlend_verkfaeri.title[activeLanguage]"></h3>
        <p class="diff-pad-r" v-if="tools.erlend_verkfaeri.description.length > 0"
          v-html="processHTMLAnchors(tools.erlend_verkfaeri.description[activeLanguage], activeLanguage)"></p>
        <ItemsContainer :items="tools.erlend_verkfaeri.categories[0].items" :active-language="activeLanguage"
          :include-about="true" />
      </div>

    </div>

    <div v-else-if="category === 'ordalistar'" class="corpora-category-container">
      <div class="single-category-overview-container">
        <p class="main-header" v-html="wordLists.ordabaekur_og_listar.title[activeLanguage]"></p>
        <p class="diff-pad-r" v-if="wordLists.ordabaekur_og_listar.description"
          v-html="wordLists.ordabaekur_og_listar.description[activeLanguage]"></p>
      </div>
      <div v-for="(category, index) in wordLists.ordabaekur_og_listar.categories" :key="index"
        class="category-container">
        <div class="main-category-name-container corpora-name-container">
          <p class="secondary-header">{{ category.title[activeLanguage] }}</p>
        </div>
        <p class="subcategory-description" v-if="category.description" v-html="category.description[activeLanguage]">
        </p>
        <ItemsContainer :items="buildItems(category.items)" :include-about="true" :clickable-titles="false"
          :active-language="activeLanguage" />
      </div>
    </div>

    <div v-else-if="category === 'kennsluefni'" class="corpora-category-container">
      <div class="single-category-overview-container">
        <p class="main-header" v-html="trainingMaterial.title[activeLanguage]"></p>
        <p class="diff-pad-r" v-if="trainingMaterial.description" v-html="trainingMaterial.description[activeLanguage]">
        </p>
      </div>
      <div v-for="(category, index) in trainingMaterial.categories" :key="index" class="category-container">
        <div class="main-category-name-container corpora-name-container">
          <p class="secondary-header">{{ category.title[activeLanguage] }}</p>
        </div>
        <p class="subcategory-description" v-if="category.description" v-html="category.description[activeLanguage]">
        </p>
        <ItemsContainer :items="category.items" :include-about="true" :clickable-titles="true"
          :active-language="activeLanguage" />
      </div>
    </div>


  </div>
  <Modal :modalDataProp="modalData" :modalIsOpenProp="modalIsOpen"
    @close-modal="modalIsOpen = false; modalData = null" />
</template>

<script>
import corpora from '@/data/corpora.json';
import languageTechnology from '@/data/language_technology.json';
import wordLists from '@/data/wordlists.json';
import tools from '@/data/tools.json';
import categoriesOverview from '@/data/categories_overview.json';
import concepts from '@/data/concepts.json';
import repoItems from '@/data/repo_items_v2.json';
import trainingMaterial from '@/data/training_material.json';
import ItemsContainer from './ItemsContainer.vue';
import Modal from '@/components/Modal.vue';
import attachClickHandlers from '@/helperFunctions/clickableWords.js';
import processHTMLAnchors from '@/helperFunctions/processJSONLinks.js';
import { useGlobalConfigStore } from "@/stores/globalConfig";
export default {
  name: 'SingleCategory',
  components: {
    ItemsContainer,
    Modal
  },
  props: {
    categoryProp: {
      type: String,
      required: true
    },
    paramProp: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      corpora: corpora,
      languageTechnology: languageTechnology,
      wordLists: wordLists,
      tools: tools,
      trainingMaterial: trainingMaterial.namsefni,
      concepts: concepts,
      categoriesOverview: categoriesOverview,
      repoItems: repoItems,
      openCategories: [],
      modalIsOpen: false,
      modalData: null,
      globalConfigStore: useGlobalConfigStore(),
      hoveredInfoBox: null
    }
  },
  mounted() {
    this.$nextTick(this.attachClickHandlers(this.$refs.singleCategoryContainer, this.handleWordClick));
  },
  updated() {
    this.$nextTick(this.attachClickHandlers(this.$refs.singleCategoryContainer, this.handleWordClick));
  },
  computed: {
    allCategories() {
      if (this.category === 'malheildir') {
        return Object.keys(this.corpora)
      }
    },
    category() {
      return this.categoryProp
    },
    activeLanguageTechnologySubcategory() {
      return this.paramProp
    },
    activeLanguageTechnologySubcategoryItems() {
      return this.languageTechnology[this.activeLanguageTechnologySubcategory]
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    }
  },
  methods: {
    attachClickHandlers: attachClickHandlers,
    processHTMLAnchors: processHTMLAnchors,
    setModalData(data) {
      this.modalIsOpen = true
      this.modalData = this.concepts[data]
    },

    handleWordClick(event) {
      const keyword = event.target.dataset.key
      this.setModalData(keyword);
    },
    buildItems(items) {
      if (!items) {
        return
      }
      let toRet = []
      for (let item of items) {
        if (this.repoItems[item.id]) {
          toRet.push(this.repoItems[item.id])
        }
      }
      return toRet
    },
    goToSubcategory(subcat) {
      this.$router.push({ name: 'maltaeknilausnir', params: { category: subcat } })
    },
  },
  watch: {
    corpora: {
      handler() {
        this.$nextTick(this.attachClickHandlers(this.$refs.singleCategoryContainer, this.handleWordClick));
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.category-name {
  display: flex;
  font-size: 1.4rem;
  font-family: 'RecklessMedium';
  /* margin-bottom: 20px; */
}

.corpora-name-container {
  display: flex;
}

.corpora-category-container {
  display: grid;
  gap: 60px;
}

/* .corpora-category {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--secondary-green);
} */

.corpora-category:hover {
  outline: 2px solid var(--primary-green);

}

/* .language-technology-category {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;  
}

.language-technology-category:hover {
  
} */


.language-technology-overview-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  width: fit-content;
}

.tools-overview-container {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 1180px) {
  .language-technology-overview-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.no-box-shadow {
  box-shadow: none;
}

.back-button-container {
  width: fit-content;
}


.language-technology-name-container {
  width: 100%;
  border-radius: 5px;
  border-bottom: none;
}

.asr-name-container {
  background-color: #f23838;
}

.ss-name-container {
  background-color: #9e38f2;
}

.mt-name-container {
  background-color: #389bf2;
}

.st-name-container {
  background-color: #f238a9;
}

.data-name-container {
  background-color: #0ed694ff;
}

.ngram-img {
  filter: brightness(0) saturate(100%) invert(15%) sepia(62%) saturate(2774%) hue-rotate(339deg) brightness(83%) contrast(90%);
}

.malvinnsla-img {
  filter: brightness(0) saturate(100%) invert(31%) sepia(82%) saturate(1321%) hue-rotate(151deg) brightness(89%) contrast(101%);
}

.cat-image {
  height: 120px;
  width: auto;
  max-width: 100%;
}

.activate-language-technology-subcategory {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

/* .category-name-container {
  width: 100%;
  justify-content: center;
} */
/* .category-name-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
} */

.other-tools-container {
  margin-top: 20px;
  display: grid;
  gap: 20px;
}

.category-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subcategory-description {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lt-item-container {
  /* max-width: 328px; */
}

.tools-overview-container>.lt-item-container {
  max-width: 100%;
}

.info-img {
  transition: opacity 0.15s ease-in-out;
}


@media (max-width: 768px) {
  .corpora-name-container {
    /* width: 100%; */
  }
}

@media (max-width: 968px) {
  .language-technology-overview-container {
    display: flex;
    flex-direction: column;
    justify-self: center;
  }

  .diff-pad-r {
    padding-right: 0px;
  }
}

@media (max-width: 1079px) {
  .diff-pad-r {
    padding-right: 0px;
  }
}

@media (min-width: 1080px) {
  .diff-pad-r {
    padding-right: 20vw;
  }
}
</style>