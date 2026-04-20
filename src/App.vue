<template>
  <Matomo />
  <Header :active-language-prop="activeLanguage" @language-changed="switchLanguage" />
  <main>
    <!-- Filter bar -->
    <div class="filter-bar" :class="selectedFilter ? `filter-bar--${selectedFilter}` : 'filter-bar--none'">
      <template v-if="!selectedFilter">
        <span class="filter-bar-label">{{ $translate('filterBarLabel') }}</span>
        <div class="filter-bar-buttons">
          <button class="filter-btn filter-btn--software" @click="globalConfigStore.setSelectedFilter('software')">{{ $translate('filterBarSoftware') }}</button>
          <button class="filter-btn filter-btn--research" @click="globalConfigStore.setSelectedFilter('research')">{{ $translate('filterBarResearch') }}</button>
        </div>
      </template>
      <template v-else>
        <div class="filter-bar-active-left">
          <strong>{{ selectedFilter === 'research' ? $translate('filterBarResearch') : $translate('filterBarSoftware') }}</strong>
          <span class="filter-bar-active-desc">{{ selectedFilter === 'research' ? $translate('filterBarActiveDescResearch') : $translate('filterBarActiveDescSoftware') }}</span>
        </div>
        <div class="filter-bar-active-right">
          <button class="filter-bar-switch" @click="globalConfigStore.setSelectedFilter(selectedFilter === 'research' ? 'software' : 'research')">
            {{ $translate('filterBarSwitchTo') }} {{ selectedFilter === 'research' ? $translate('filterBarSoftware') : $translate('filterBarResearch') }}
          </button>
          <button class="filter-bar-clear" @click="globalConfigStore.setSelectedFilter(null)">{{ $translate('filterBarShowAll') }}</button>
        </div>
      </template>
    </div>

    <RouterView />
  </main>
  <!-- <Footer /> -->
</template>

<script>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useGlobalConfigStore } from './stores/globalConfig';
import Matomo from '@/components/Matomo.vue'
export default {
  name: 'App',
  components: {
    RouterView,
    Header,
    Footer,
    Matomo
  },
  data() {
    return {
      globalConfigStore: useGlobalConfigStore()
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage;
    },
    selectedFilter() {
      return this.globalConfigStore.selectedFilter;
    }
  },
  methods: {
    switchLanguage(newLang) {
      this.globalConfigStore.setActiveLanguage(newLang);
      this.$router.push({
        name: this.$route.name,
        params: {
          ...this.$route.params,
          lang: newLang
        }
      })
    }
  }
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: -100px -100px 60px -100px;
  padding: 12px 100px;
  font-size: 15px;
}

.filter-bar--none {
  background-color: var(--background-color);
  border-bottom: 1px solid var(--light-grey);
}

.filter-bar--research {
  background-color: #deeaf4;
  border-bottom: 2px solid #4A7FA5;
  color: #2a5070;
}

.filter-bar--software {
  background-color: #faeade;
  border-bottom: 2px solid #C4602A;
  color: #7a3210;
}

.filter-bar-label {
  color: var(--medium-grey);
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.filter-bar-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: opacity 0.15s;
  font-family: inherit;
}

.filter-btn:hover {
  opacity: 0.8;
}

.filter-btn--research {
  background-color: #deeaf4;
  color: #2a5070;
  border-color: #4A7FA5;
}

.filter-btn--software {
  background-color: #faeade;
  color: #7a3210;
  border-color: #C4602A;
}

.filter-bar-active-left {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
}

.filter-bar-active-left strong {
  font-weight: bold;
}

.filter-bar-active-desc {
  font-size: 14px;
  opacity: 0.85;
}

.filter-bar-active-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter-bar-switch,
.filter-bar-clear {
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: underline;
  padding: 0;
  font-family: inherit;
}

.filter-bar--research .filter-bar-switch {
  color: #2a5070;
}

.filter-bar--software .filter-bar-switch {
  color: #7a3210;
}

.filter-bar-clear {
  color: var(--primary-green) !important;
}

@media (max-width: 887px) {
  .filter-bar {
    margin: -20px -20px 40px -20px;
    padding: 12px 20px;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
