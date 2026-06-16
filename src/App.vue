<template>
  <Matomo />
  <Header :active-language-prop="activeLanguage" @language-changed="switchLanguage" />
  <main>
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
import repoItems from '@/data/repo_items_v2.json'
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
    },
    currentItemAudience() {
      if (this.$route.name !== 'gogn') return null;
      const slug = this.$route.params.name;
      const targetUrl = `/gogn/${slug}/`;
      const item = Object.values(repoItems).find(item =>
        Array.isArray(item.url) && item.url.some(u => u.type === 'more_info' && u.url === targetUrl)
      );
      if (!item || !item.audience) return null;
      return item.audience;
    },
    canSwitchToSoftware() {
      if (this.currentItemAudience === null) return true;
      return this.currentItemAudience.includes('software');
    },
    canSwitchToResearch() {
      if (this.currentItemAudience === null) return true;
      return this.currentItemAudience.includes('research');
    },
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
  display: grid;
  grid-template-columns: 1fr 5fr;
  font-size: 15px;
}

.filter-bar-inner {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 100px;
}

.filter-bar--none {
  background-color: var(--background-color);
  border-bottom: 2px solid var(--primary-green);
}

.filter-bar--research {
  background-color: var(--background-color);
  border-bottom: 2px solid var(--primary-green);
}

.filter-bar--software {
  background-color: var(--background-color);
  border-bottom: 2px solid var(--primary-green);
}

.filter-bar-buttons {
  display: flex;
  gap: 0;
}

.filter-btn {
  padding: 6px 18px;
  font-size: 14px;
  cursor: pointer;
  border: 1.5px solid var(--primary-green);
  transition: background-color 0.15s, color 0.15s;
  font-family: inherit;
  background: none;
  color: var(--primary-green);
}

.filter-btn:first-child {
  border-radius: 20px 0 0 20px;
  border-right: none;
}

.filter-btn:last-child {
  border-radius: 0 20px 20px 0;
}

.filter-btn--active {
  background-color: var(--primary-green);
  color: white;
}

.filter-btn--inactive {
  background: none;
  color: var(--primary-green);
}

.filter-btn--inactive:hover {
  background-color: rgba(0,0,0,0.05);
}

.filter-bar-clear {
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: underline;
  padding: 0;
  font-family: inherit;
  color: inherit;
}

@media (max-width: 887px) {
  .filter-bar {
    margin: -20px -20px 32px -20px;
    padding: 8px 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .filter-bar-label {
    text-align: center;
    font-size: 11px;
  }

  .filter-bar-buttons {
    justify-content: center;
  }

  .filter-btn {
    flex: 1;
    text-align: center;
  }

  .filter-bar-active-left {
    flex-direction: column;
    gap: 2px;
  }

  .filter-bar-active-desc {
    font-size: 12px;
  }

  .filter-bar-active-right {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
}
</style>
