<template>
  <div class="search-container" :inert="modalIsOpen">
    <p class="about-search" v-html="$translate('searchDescription')"></p>
    <div class="search-controls">
      <div class="search-controls-top-row">
        <div class="search-input-wrapper">
          <svg class="search-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input autofocus v-model="currentSearchInput" :placeholder="$translate('searchSearch')">
        </div>
        <div class="search-controls-buttons">
          <button class="show-detailed-search-button search-controls-button" @click="showSubTypes = !showSubTypes">
            <span v-if="!isMobileScreenSize" class="show-detailed-search-text button-with-chevron">
              <p v-if="showSubTypes" v-html="$translate('searchShowSimpleSearch')"></p>
              <p v-else v-html="$translate('searchShowDetailedSearch')"></p>
              <img class="chevron" :class="{ rotated: showSubTypes }" src="/public/symbols/chevron.svg" />
            </span>

            <span v-else-if="isMobileScreenSize" class="show-detailed-search-text button-with-chevron">
              <p v-if="showSubTypes" v-html="$translate('searchShowSimpledSearchMobile')"></p>
              <p v-else v-html="$translate('searchShowDetailedSearchMobile')"></p>
              <img class="chevron" :class="{ rotated: showSubTypes }" src="/public/symbols/chevron.svg" />
            </span>

          </button>
          <button class="clear-subtypes search-controls-button"
            :class="{ 'disabled-search-controls-button': selectedSubTypes.length === 0 & selectedTypes.length === 0 && currentSearchInput.length === 0 }"
            @click="clearFilters">
            <p v-html="$translate('searchClearSearch')"></p>
          </button>

        </div>
      </div>
      <div class="all-checkboxes">
        <div class="search-controls-checkboxes">
          <div class="checkboxes-container type-checkboxes">
            <p class="checkboxes-title" v-html="$translate('searchType')"></p>
            <div class="checkboxes">
              <div class="checkbox-and-label">
                <input type="checkbox" id="toolsChecked" value="tool" v-model="selectedTypes">
                <label for="toolsChecked" v-html="$translate('searchLabelTools')"></label>
              </div>
              <div class="checkbox-and-label">
                <input type="checkbox" id="dataChecked" value="data" v-model="selectedTypes">
                <label for="dataChecked" v-html="$translate('searchLabelData')"></label>
              </div>
              <div class="checkbox-and-label">
                <input type="checkbox" id="modelsChecked" value="model" v-model="selectedTypes">
                <label for="modelsChecked" v-html="$translate('searchLabelModels')"></label>

              </div>

            </div>
          </div>
          <div class="checkboxes-container language-checkboxes">
            <p class="checkboxes-title" v-html="$translate('searchLanguage')"></p>
            <div class="checkboxes">
              <div class="checkbox-and-label">
                <input type="checkbox" id="icelandicChecked" value="is" v-model="selectedLanguages">
                <label for="icelandicChecked" v-html="$translate('searchLabelIcelandic')"></label>
              </div>
              <div class="checkbox-and-label">
                <input type="checkbox" id="englishChecked" value="en" v-model="selectedLanguages">
                <label for="englishChecked" v-html="$translate('searchLabelEnglish')"></label>
              </div>
              <div class="checkbox-and-label">
                <input type="checkbox" id="polishChecked" value="pl" v-model="selectedLanguages">
                <label for="polishChecked" v-html="$translate('searchLabelPolish')"></label>
              </div>
              <div class="checkbox-and-label">
                <input type="checkbox" id="otherChecked" value="other" v-model="selectedLanguages">
                <label for="otherChecked" v-html="$translate('searchLabelOther')"></label>
              </div>

            </div>
          </div>
        </div>

        <transition name="slide">
          <div v-if="showSubTypes" class="checkboxes-container">
            <p class="checkboxes-title" v-html="$translate('searchSubType')"></p>
            <div class="checkboxes subtype-checkboxes">
              <div v-for="(column, colIndex) in subTypesColumns" :key="colIndex" class="subtypes-column">
                <div v-for="group in column" :key="group.nameEn" class="checkbox-and-label">
                  <input type="checkbox" :id="group.nameEn" :value="group.nameEn" v-model="selectedSubTypes">
                  <label class="subtype-checkbox-label" :title="group.nameIs" :for="group.nameEn">{{ group.nameIs }}</label>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>

    </div>

    <div v-show="isLoadingData" class="loading-spinner-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-show="!isLoadingData" class="data-overview-container">
      <button class="open-all-main-categories-button button-with-chevron" @click="handleOpenAllClick">
        <p>{{ openMainCategories.length === 0 ? $translate('searchShowAll') : $translate('searchHideAll') }}</p>
        <img class="chevron chevron-white" :class="openMainCategories.length !== 0 ? 'rotated' : ''"
          src="/public/symbols/chevron.svg" ref="openAllChevron" />
      </button>
      <div
        :class="{ 'closed-main-category': !openMainCategories.includes(mainCategory.name) && !hasRelevantSubCategories(mainCategory) }"
        v-for="(mainCategory, mainKey) in mainCategories" :key="mainKey">
        <div v-if="hasRelevantSubCategories(mainCategory)">
          <button class="main-category-name-button" @click="handleMainCategoryClick(mainCategory.name)">
            <div class="main-category-name button-with-chevron">
              <p class="main-category-name-text" v-html="mainCategory.name[activeLanguage]"></p>
              <img class="chevron chevron-white" :class="{ rotated: openMainCategories.includes(mainCategory.name) }"
                src="/public/symbols/chevron.svg" />
            </div>
          </button>

          <Transition name="category-slide">

            <div v-if="openMainCategories.includes(mainCategory.name)" class="categories">

              <div v-for="(subCategory, subKey) in mainCategory.categories" :key="subKey">
                <div v-if="hasItemsInSubCategory(subCategory)">
                  <button class="category-name-container" @click="handleCategoryClick(subCategory)">
                    <div class="category-name button-with-chevron">
                      <p v-html="subCategories[subCategory].title[activeLanguage]"></p>
                      <img class="chevron" :class="{ rotated: openCategories.includes(subCategory) }"
                        src="/public/symbols/chevron.svg" />
                      <div class="info-icon-container">
                        <button class="info-icon-wrapper" v-if="subCategories[subCategory].description && !categoryMatchesQuery(subCategory)"
                          @click.stop="setModalData(subCategories[subCategory])">
                          <img class="info-icon default-icon" src="/public/symbols/info-symbol.svg" />
                          <img class="info-icon hover-icon" src="/public/symbols/info-symbol-fill.svg" />
                        </button>
                      </div>
                    </div>
                  </button>
                  <div v-if="categoryMatchesQuery(subCategory) && subCategories[subCategory].description"
                    class="category-match-description regular-text"
                    v-html="subCategories[subCategory].description[activeLanguage]">
                  </div>
                  <Transition name="category-slide">

                    <ItemsContainer :active-language="activeLanguage" v-if="openCategories.includes(subCategory)"
                      :items="categoryMatchesQuery(subCategory) ? allItemsInSubCategory(subCategory) : filteredSearchResults.filter(item => isItemInSubCategory(item, subCategory))"
                      :include-about="true" />
                  </Transition>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <Modal :modal-data-prop="modalData" :modalIsOpenProp="modalIsOpen" @close-modal="modalIsOpen = false" />
  </div>
</template>

<script>
import repoItems from '@/data/repo_items_v2.json'
import subCategories from '@/data/subCat.json'
import mainCategories from '@/data/mainCat.json'
import ItemsContainer from '@/components/ItemsContainer.vue'
import Modal from '@/components/Modal.vue'
import { useGlobalConfigStore } from "@/stores/globalConfig";
export default {
  name: 'Search',
  components: { ItemsContainer, Modal },
  data() {
    return {
      currentSearchInput: '',
      debouncedSearchInput: '',
      debounceTimeout: null,
      toolsChecked: false,
      dataChecked: false,
      modelsChecked: false,
      icelandicChecked: false,
      modalIsOpen: false,
      modalData: null,
      isLoadingData: false,
      repoItems: repoItems,
      subCategories: subCategories,
      mainCategories: mainCategories,
      selectedSubTypes: [],
      selectedTypes: [],
      openMainCategories: [],
      openCategories: [],
      selectedLanguages: [],
      showSubTypes: false,
      openAll: false,
      globalConfigStore: useGlobalConfigStore(),
      subCategoryItemMap: {},
      hoveredInfoSymbol: null,
      subTypeGroups: [
        {
          nameIs: 'Málheildir',
          nameEn: 'Corpora',
          items: ['adrar_malheildir', 'sub_malheildir', 'sub_malheildir_1', 'sub_malheildir_islenska_og_enska', 'sub_malheildir_islenska_og_polska', 'sub_textamalheildir']
        },
        {
          nameIs: 'Annað',
          nameEn: 'Other',
          items: ['annad', 'sub_annad', 'sub_annad_1']
        },
        {
          nameIs: 'N-stæður',
          nameEn: 'N-grams',
          items: ['nstaedur']
        },
        {
          nameIs: 'Orðasöfn',
          nameEn: 'Lexicons',
          items: ['onnur_ordasofn']
        },
        {
          nameIs: 'Orðvigrar',
          nameEn: 'Word Embeddings',
          items: ['ordagreypingar_e._word_embeddings']
        },
        {
          nameIs: 'Orðanet',
          nameEn: 'Wordnets',
          items: ['ordanet']
        },
        {
          nameIs: 'Orðabækur',
          nameEn: 'Dictionaries',
          items: ['sub_adrar_ordabaekur', 'sub_vefordabaekur']
        },
        {
          nameIs: 'BÍN',
          nameEn: 'BÍN',
          items: ['sub_beygingarlysing_islensks_nutimamals']
        },
        {
          nameIs: 'Gullstaðlar og prófunarsett',
          nameEn: 'Gold Standards and Evaluation Sets',
          items: ['sub_gullstadlar_og_profunarsett', 'sub_profunargogn', 'vidmidungargogn_fyrir_afkastaprofun_storra_mallikana']
        },
        {
          nameIs: 'Hljóðritunarforrit og -líkön',
          nameEn: 'Speech Recognition Software and Models',
          items: ['sub_hljodritunarforrit_og_likon']
        },
        {
          nameIs: 'Hugbúnaður og vefsíður',
          nameEn: 'Software and Websites',
          items: ['sub_hugbunadur_/_vefsidur']
        },
        {
          nameIs: 'Lemmöld',
          nameEn: 'Lemmatizers',
          items: ['sub_lemmold']
        },
        {
          nameIs: 'Líkön',
          nameEn: 'Models',
          items: ['sub_likon', 'sub_likon_1', 'sub_mallikon', 'sub_thydingarlikon']
        },
        {
          nameIs: 'Listar',
          nameEn: 'Lists',
          items: ['sub_listar', 'sub_listar_1']
        },
        {
          nameIs: 'Mállíkön',
          nameEn: 'Language Models',
          items: []
        },
        {
          nameIs: 'Markarar',
          nameEn: 'Taggers',
          items: ['markarar']
        },
        {
          nameIs: 'Prófunargögn',
          nameEn: 'Test Data',
          items: []
        },
        {
          nameIs: 'Raddsýni og upptökur',
          nameEn: 'Speech and Recordings',
          items: ['sub_raddsyni_og_upptokur', 'sub_raddsyni_og_upptokur_1']
        },
        {
          nameIs: 'Stuðningstól',
          nameEn: 'Support Tools',
          items: ['sub_studningstol',]
        },
        {
          nameIs: 'Sýnisforskriftir',
          nameEn: 'Recipes',
          items: ['sub_synisforskriftir']
        },
        {
          nameIs: 'Þáttarar',
          nameEn: 'Parsers',
          items: ['thattarar']
        },
        {
          nameIs: 'Þjálfunargögn',
          nameEn: 'Training Data',
          items: ['sub_thjalfunargogn']
        },
        {
          nameIs: 'Þýðingarlíkön',
          nameEn: 'Translation Models',
          items: []
        },
        {
          nameIs: 'Tilreiðarar',
          nameEn: 'Tokenizers',
          items: ['sub_tilreidarar']
        },
        {
          nameIs: 'Veflesarar',
          nameEn: 'Web Readers',
          items: ['sub_veflesari']
        },
        {
          nameIs: 'Veforðabækur',
          nameEn: 'Web Dictionaries',
          items: []
        },
        {
          nameIs: 'Vefviðmót fyrir gerð framburðarorðabóka',
          nameEn: 'Web Interface for Pronunciation Dictionaries',
          items: ['sub_vefvidmot_fyrir_gerd_framburdarordaboka']
        },
        {
          nameIs: 'Trjábankar',
          nameEn: 'Treebanks',
          items: ['trjabankar']
        },
        {
          nameIs: 'Viðmiðungargögn fyrir afkastaprófun (stórra) mállíkana',
          nameEn: 'Benchmark Data for Large Language Models',
          items: []
        },
        {
          nameIs: 'Ýmis verkfæri fyrir talgreiningu og talgervingu',
          nameEn: 'Various tools for speech recognition and synthesis',
          items: ['ymis_verkfaeri_fyrir_talgreiningu_og_talgervingu']
        }
      ]
    }
  },
  mounted() {
    this.buildSubCategoryItemMap();
    // this.openMainCategories = Object.values(this.mainCategories).map(item => item.name)
    this.openCategories = Object.keys(this.subCategories)
    let routerQuery = this.$route.query
    if (routerQuery.hasOwnProperty('q')) {
      this.currentSearchInput = routerQuery.q
    }
    if (routerQuery.hasOwnProperty('subTypes')) {
      let subTypes = routerQuery.subTypes
      if (typeof subTypes === 'string') {
        this.selectedSubTypes = [subTypes]
      } else {
        this.selectedSubTypes = subTypes
      }
      this.showSubTypes = true
    }

    if (routerQuery.hasOwnProperty('types')) {
      let types = routerQuery.types
      if (typeof types === 'string') {
        this.selectedTypes = [types]
      } else {
        this.selectedTypes = types
      }
    }

    if (routerQuery.hasOwnProperty('lang')) {
      let lang = routerQuery.lang
      if (typeof lang === 'string') {
        this.selectedLanguages = [lang]
      } else {
        this.selectedLanguages = lang
      }
    }
  },
  methods: {
    async buildSubCategoryItemMap() {
      this.isLoadingData = true;

      await new Promise(resolve => setTimeout(resolve, 0));

      const map = {};

      const buildMap = (subCategoryName) => {
        if (!this.subCategories[subCategoryName]) return new Set();
        let items = new Set(this.subCategories[subCategoryName].items);
        if (this.subCategories[subCategoryName].subcategories) {
          this.subCategories[subCategoryName].subcategories.forEach(nested => {
            buildMap(nested).forEach(item => items.add(item));
          });
        }
        map[subCategoryName] = items;
        return items;
      };

      Object.keys(this.subCategories).forEach(buildMap);
      this.subCategoryItemMap = map;
      this.isLoadingData = false;
    },
    getItemKey(item) {
      return Object.keys(this.repoItems).find(key => this.repoItems[key] === item);
    },
    setModalData(data) {
      this.modalIsOpen = true
      this.modalData = data
    },
    isItemInSubCategory(item, subCategory) {
      if (!this.subCategoryItemMap[subCategory]) return false;
      if (this.mainCategories[subCategory]) return false;
      return this.subCategoryItemMap[subCategory].has(this.getItemKey(item));
    },

    normalizeString(str) {
      if (!str) return "";
      return str
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/Ð/g, "D").replace(/ð/g, "d")
        .replace(/Þ/g, "TH").replace(/þ/g, "th")
        .toLowerCase();
    },

    stripHtml(str) {
      return str ? str.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    },

    categoryMatchesQuery(subCategoryKey) {
      const query = this.normalizeString(this.debouncedSearchInput);
      if (!query) return false;
      const cat = this.subCategories[subCategoryKey];
      if (!cat) return false;
      const words = query.split(/\s+/).filter(Boolean);
      const titleIs = this.normalizeString(cat.title?.is);
      const titleEn = this.normalizeString(cat.title?.en);
      const descIs = this.normalizeString(this.stripHtml(cat.description?.is));
      const descEn = this.normalizeString(this.stripHtml(cat.description?.en));
      const text = `${titleIs} ${titleEn} ${descIs} ${descEn}`;
      return words.every(word => text.includes(word));
    },

    allItemsInSubCategory(subCategoryKey) {
      if (!this.subCategoryItemMap[subCategoryKey]) return [];
      return Object.values(this.repoItems).filter(item =>
        this.isItemInSubCategory(item, subCategoryKey)
      );
    },

    hasItemsInSubCategory(subCategory) {
      if (this.categoryMatchesQuery(subCategory)) return true;
      return this.filteredSearchResults.some(item =>
        this.isItemInSubCategory(item, subCategory)
      );
    },

    hasRelevantSubCategories(mainCategory) {
      return mainCategory.categories.some(subCategory => this.hasItemsInSubCategory(subCategory));
    },

    clearFilters() {
      this.currentSearchInput = '';
      this.selectedTypes = [];
      this.selectedSubTypes = [];
      this.selectedLanguages = [];
    },
    handleCategoryClick(cat) {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.openCategories.includes(cat)) {
            this.openCategories = this.openCategories.filter(c => c !== cat)
          } else {
            this.openCategories = [...this.openCategories, cat]
          }
        }, 15)
      })
    },
    handleMainCategoryClick(cat) {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.openMainCategories.includes(cat)) {
            this.openMainCategories = this.openMainCategories.filter(c => c !== cat)
          } else {
            this.openMainCategories = [...this.openMainCategories, cat]
          }
        }, 15)
      })
    },
    handleOpenAllClick() {
      if (this.openMainCategories.length === 0) {
        this.openAll = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.openMainCategories = Object.values(this.mainCategories).map(item => item.name)
            setTimeout(() => {
              this.openCategories = Object.keys(this.subCategories).map(item => item)
            }, 15)
          }, 15)
        })
      } else {
        this.openAll = false
        this.openMainCategories = []
        this.openCategories = []
      }
    }
  },
  computed: {
    filteredSearchResults() {
      let itemsArray = Object.values(this.repoItems);

      const normalizeString = str => {
        if (!str) return "";
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/Ð/g, "D").replace(/ð/g, "d")
          .replace(/Þ/g, "TH").replace(/þ/g, "th")
          .toLowerCase();
      };

      const stripHtml = str => str ? str.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';

      const expandedSubTypes = this.selectedSubTypes.flatMap(selectedGroup => {
        const group = this.subTypeGroups.find(g => g.nameEn === selectedGroup || g.nameIs === selectedGroup);
        return group ? group.items : [selectedGroup];
      });

      return itemsArray
        .filter(item => {
          const query = normalizeString(this.debouncedSearchInput);
          const otherLanguage = this.activeLanguage === 'is' ? 'en' : 'is';
          const titleText = normalizeString(item.title?.[this.activeLanguage]) + ' ' + normalizeString(item.title?.[otherLanguage]);
          const descText = normalizeString(stripHtml(item.description?.[this.activeLanguage])) + ' ' + normalizeString(stripHtml(item.description?.[otherLanguage]));
          const shortDescText = normalizeString(stripHtml(item.short_description?.[this.activeLanguage])) + ' ' + normalizeString(stripHtml(item.short_description?.[otherLanguage]));

          const words = query.split(/\s+/).filter(Boolean);
          const matchesSearch = !this.debouncedSearchInput ||
            words.every(word =>
              titleText.includes(word) ||
              descText.includes(word) ||
              shortDescText.includes(word)
            );

          const matchesTypes = this.selectedTypes.length === 0 ||
            (Array.isArray(item.type) && item.type.some(type => this.selectedTypes.includes(type)));

          const matchesSubTypes = expandedSubTypes.length === 0 ||
            (Array.isArray(item.sub_types) && item.sub_types.some(sub => expandedSubTypes.includes(sub)));

          const matchesLang = this.selectedLanguages.length === 0 ||
            (Array.isArray(item.languages) && item.languages.some(lang => this.selectedLanguages.includes(lang)))

          return matchesSearch && matchesTypes && matchesSubTypes && matchesLang;
        })
        .sort((a, b) => {
          const titleA = normalizeString(a.title[this.activeLanguage] || "");
          const titleB = normalizeString(b.title[this.activeLanguage] || "");
          return titleA.localeCompare(titleB, 'en', { sensitivity: 'base' });
        });
    },
    allSubTypes() {
      let subTypesSet = new Set();

      Object.values(this.repoItems).forEach(item => {
        if (Array.isArray(item.sub_types)) {
          item.sub_types.forEach(subType => subTypesSet.add(subType));
        }
      });
      return Array.from(subTypesSet).sort();
    },
    subTypesColumns() {
      let sortedGroups = [...this.subTypeGroups].sort((a, b) => a.nameIs.localeCompare(b.nameIs)).filter(group => group.items.length > 0)
      let numColumns = 5;
      let numItems = sortedGroups.length;
      let baseNumRows = Math.floor(numItems / numColumns);
      let extraRows = numItems % numColumns;

      let columns = Array.from({ length: numColumns }, () => []);

      let currentIndex = 0;
      for (let col = 0; col < numColumns; col++) {
        let rowsInThisColumn = baseNumRows + (col < extraRows ? 1 : 0); // Distribute extra rows evenly
        for (let row = 0; row < rowsInThisColumn; row++) {
          if (currentIndex < numItems) {
            columns[col].push(sortedGroups[currentIndex]);
            currentIndex++;
          }
        }
      }

      return columns;
    },
    urlParams() {
      let params = {};
      if (this.selectedTypes.length > 0) {
        params.types = this.selectedTypes;
      }
      if (this.selectedSubTypes.length > 0) {
        params.subTypes = this.selectedSubTypes;
      }
      if (this.selectedLanguages.length > 0) {
        params.lang = this.selectedLanguages;
      }
      return params;
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    isMobileScreenSize() {
      return this.globalConfigStore.isMobileScreenSize
    },
    categoriesWithItemsFoundInSearch() {
      let categories = new Set();
      this.filteredSearchResults.forEach(item => {
        Object.keys(this.subCategories).forEach(subCategory => {
          if (this.isItemInSubCategory(item, subCategory)) {
            categories.add(subCategory);
          }
        });
      });
      Object.keys(this.subCategories).forEach(subCategory => {
        if (this.categoryMatchesQuery(subCategory)) {
          categories.add(subCategory);
        }
      });
      return Array.from(categories);
    },
    mainCategoriesWithItemsFoundInSearch() {
      let mainCategories = new Set();
      this.categoriesWithItemsFoundInSearch.forEach(subCategory => {
        Object.keys(this.mainCategories).forEach(mainCategory => {
          if (this.mainCategories[mainCategory].categories.includes(subCategory)) {
            mainCategories.add(this.mainCategories[mainCategory].name);
          }
        });
      });
      return Array.from(mainCategories);
    },
    searchParametersAreEmpty() {
      return this.currentSearchInput.length === 0 && this.selectedTypes.length === 0 && this.selectedSubTypes.length === 0 && this.selectedLanguages.length === 0
    }
  },
  watch: {
    urlParams: {
      handler(newParams) {
        this.$router.push({ query: newParams });
      },
      deep: true
    },
    mainCategoriesWithItemsFoundInSearch: {
      handler(newCategories) {
        if (this.searchParametersAreEmpty) {
          this.openMainCategories = []
        } else {
          this.openMainCategories = newCategories;
        }
      },
      immediate: true
    },
    categoriesWithItemsFoundInSearch: {
      handler(newCategories) {
        if (this.searchParametersAreEmpty) {
          this.openCategories = []
        } else {
          this.openCategories = newCategories;
        }
      },
      immediate: true
    },
    currentSearchInput(newVal) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.debouncedSearchInput = newVal;
      }, 200);
    }
  }
}

</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-search {}

.search-controls {
  border-radius: 10px;
}

.search-controls-checkboxes {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.search-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.search-input-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: var(--medium-grey);
  pointer-events: none;
}

input {
  border-radius: 10px;
  padding: 10px 10px 10px 36px;
  border: none;
}

.checkboxes-container {
  display: flex;
  background-color: white;
  flex-direction: column;
}

.checkboxes-container>label {
  margin-left: 3px;
  margin-right: 10px;
}

.checkboxes-title {
  font-size: 20px;
  line-height: 135%;
  margin-bottom: 16px;
}


.subtype-checkboxes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.subtype-checkbox-label {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


.subtype-column {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.search-controls-button {
  cursor: pointer;
  margin-top: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  width: 180px;
  border: none;
  font-family: 'Reckless';
  font-size: 1rem;
  color: var(--primary-green);
  border: 1px solid white;
}

.search-controls-button:hover {
  border: 1px solid var(--primary-green);
}

.disabled-search-controls-button {
  border: 1px solid #f0f0f0;
}

.show-detailed-search-text {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.disabled-search-controls-button {
  cursor: not-allowed;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.search-controls-buttons {
  display: flex;
  gap: 10px;
}

.checkbox-and-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkboxes-container {
  border-radius: 10px;
  padding: 16px;
}

.checkboxes:not(.subtype-checkboxes) {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.all-checkboxes {
  display: grid;
  gap: 20px;
}

.subTypes-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.main-category-name {
  display: flex;
  gap: 10px;
  width: fit-content;
  cursor: pointer;
  align-items: center;

}

.category-name-container {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}

.category-match-description {
  margin: -12px 10px 16px 10px;
  font-size: 14px;
  opacity: 0.8;
}

/* .button-with-chevron img:nth-child(2) {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
} */

.button-with-chevron .chevron {
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}

.button-with-chevron .chevron.rotated {
  transform: rotate(90deg);
}

.category-name {
  display: flex;
  gap: 10px;
  width: fit-content;
  cursor: pointer;
  align-items: center;
}


.rotated {
  transform: rotate(90deg);
}

.data-overview-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  margin-top: 20px;
}

.closed-main-category {
  display: none;
}

.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: var(--primary-green);
  animation: spin 1s linear infinite;
}

.open-all-main-categories-button {
  display: flex;
  justify-content: space-between;
  width: 96px;
  background-color: var(--primary-green);
  border-radius: 10px;
  color: white;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  align-items: center;

}


/* .open-all-main-categories-button img:nth-child(2) {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
} */

.open-all-arrow {
  text-align: center;
}

.info-icon {
  height: 1.2rem;
}

.info-icon-container {
  display: flex;
  justify-content: center;
}

label {
  font-family: 'InterLight';
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.chevron {
  height: 16px;
}

.chevron-white {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(101%) contrast(105%);
}

@media (max-width: 1172px) {
  .subtype-checkboxes {
    display: grid;
    grid-template-columns: 2fr;
    gap: 0px;
  }
}


@media (max-width: 912px) {
  .subtype-checkboxes {
    display: grid;
    grid-template-columns: 1fr;
  }

  .subtype-checkboxes {
    gap: 0px;
  }

  .search-controls-button {
    width: 120px;
  }
}

@media (max-width: 768px) {
  .category-name-container {
    margin-left: 0px;
  }
}


</style>