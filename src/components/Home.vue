<template>
  <div class="home-container">
    <div class="home-title-container">
      <h1 class="main-header" v-html="$translate('malbankinnTitle')"></h1>
      <p v-html="$translate('homeInfo')"></p>
    </div>

    <div class="home-persona-section">
      <p class="home-section-label">{{ $translate('homeWhatAreYouWorkingOn') }}</p>
      <div class="home-persona-cards">
        <div
          class="home-item-container home-persona-card"
          :class="{ 'home-persona-selected': selectedPersona === 'research' }"
          @click="selectPersona('research')"
        >
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homePersonaResearchTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">{{ $translate('homePersonaResearchContent') }}</p>
          </div>
          <span v-if="selectedPersona === 'research'" class="home-persona-check">✓</span>
        </div>

        <div
          class="home-item-container home-persona-card"
          :class="{ 'home-persona-selected': selectedPersona === 'software' }"
          @click="selectPersona('software')"
        >
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homePersonaSoftwareTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">{{ $translate('homePersonaSoftwareContent') }}</p>
          </div>
          <span v-if="selectedPersona === 'software'" class="home-persona-check">✓</span>
        </div>
      </div>
    </div>

    <div v-if="selectedPersona" class="home-recommendations">
      <p class="home-section-label">{{ recommendationsLabel }}</p>
      <div class="home-recommendation-list">
        <RouterLink
          v-for="item in recommendedItems"
          :key="item.path"
          class="home-recommendation-item regular-text"
          :to="`/${$route.params.lang}/${item.path}`"
        >
          <span class="home-rec-bullet">●</span>
          <div class="home-rec-text">
            <span class="home-rec-title">{{ $translate(item.titleKey) }}</span>
            <p class="home-description-text">{{ $translate(item.descKey) }}</p>
          </div>
          <span class="home-rec-arrow">→</span>
        </RouterLink>
      </div>
    </div>

    <div class="home-direct-browse">
      <p class="home-section-label">{{ $translate('homeOrBrowseDirectly') }}</p>
      <div class="home-pills">
        <RouterLink class="home-pill regular-text" :to="`/${$route.params.lang}/malheildir`">{{ $translate('headerCorpora') }}</RouterLink>
        <RouterLink class="home-pill regular-text" :to="`/${$route.params.lang}/verkfaeri`">{{ $translate('headerTools') }}</RouterLink>
        <RouterLink class="home-pill regular-text" :to="`/${$route.params.lang}/maltaeknilausnir`">{{ $translate('headerLTSolutions') }}</RouterLink>
        <RouterLink class="home-pill regular-text" :to="`/${$route.params.lang}/ordalistar`">{{ $translate('headerLexicons') }}</RouterLink>
        <RouterLink class="home-pill regular-text" :to="`/${$route.params.lang}/nams_og_kennsluefni`">{{ $translate('homeTeachingMaterialTitle') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalConfigStore } from '@/stores/globalConfig';
export default {
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      selectedPersona: null
    }
  },
  created() {
    const p = this.$route.query.persona
    if (p === 'research' || p === 'software') {
      this.selectedPersona = p
    }
  },
  methods: {
    selectPersona(persona) {
      this.selectedPersona = persona
      this.$router.replace({ query: { ...this.$route.query, persona } })
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    recommendationsLabel() {
      if (this.selectedPersona === 'research') return this.$translate('homeRecommendedForResearch')
      if (this.selectedPersona === 'software') return this.$translate('homeRecommendedForSoftware')
      return ''
    },
    recommendedItems() {
      if (this.selectedPersona === 'research') {
        return [
          { path: 'malheildir', titleKey: 'headerCorpora', descKey: 'homeRecMalheildir' },
          { path: 'verkfaeri', titleKey: 'headerTools', descKey: 'homeRecVerkfaeri' },
          { path: 'ordalistar', titleKey: 'headerLexicons', descKey: 'homeRecOrdalistar' },
          { path: 'nams_og_kennsluefni', titleKey: 'homeTeachingMaterialTitle', descKey: 'homeRecKennsluefni' },
        ]
      }
      return [
        { path: 'verkfaeri', titleKey: 'headerTools', descKey: 'homeRecVerkfaeri' },
        { path: 'maltaeknilausnir/malryni', titleKey: 'ltMalryniTitle', descKey: 'ltMalryniDesc' },
        { path: 'maltaeknilausnir/talgerving', titleKey: 'ltTalgervingTitle', descKey: 'ltTalgervingDesc' },
        { path: 'maltaeknilausnir/talgreining', titleKey: 'ltTalgreiningTitle', descKey: 'ltTalgreiningDesc' },
        { path: 'maltaeknilausnir/velthyding', titleKey: 'ltVelthydingTitle', descKey: 'ltVelthydingDesc' },
        { path: 'maltaeknilausnir/stodtol', titleKey: 'ltStodtolTitle', descKey: 'ltStodtolDesc' },
        { path: 'maltaeknilausnir/ymis_gogn', titleKey: 'ltYmisGognTitle', descKey: 'ltYmisGognDesc' },
      ]
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 40px;
}

.home-title-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-section-label {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--medium-grey);
  margin-bottom: 16px;
}

.home-persona-section {
  display: flex;
  flex-direction: column;
}

.home-persona-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.home-persona-card {
  position: relative;
  cursor: pointer;
  background-color: var(--sky-blue);
  border: 2px solid transparent;
  padding: 32px 48px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.15s ease;
}

.home-persona-card:hover {
  border-color: var(--blue-border);
}

.home-persona-selected {
  border-color: var(--primary-green) !important;
}

.home-persona-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background-color: var(--primary-green);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
}

.home-text-container {
  display: flex;
  flex-direction: column;
}

.home-recommendations {
  display: flex;
  flex-direction: column;
}

.home-recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-recommendation-item {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  gap: 16px;
  background-color: var(--bright-vream);
  border: 1px solid var(--light-grey);
  border-radius: 10px;
  padding: 20px 24px;
  text-decoration: none;
  color: var(--primary-text-color);
  transition: border-color 0.15s ease;
}

.home-recommendation-item:hover {
  border-color: var(--primary-green);
}

.home-rec-bullet {
  color: var(--primary-green);
  font-size: 10px;
  align-self: start;
  padding-top: 4px;
}

.home-rec-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.home-rec-title {
  font-weight: 600;
  font-size: 18px;
}

.home-rec-arrow {
  color: var(--medium-grey);
  font-size: 16px;
}

.home-direct-browse {
  display: flex;
  flex-direction: column;
}

.home-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.home-pill {
  padding: 8px 20px;
  border: 1px solid var(--blue-stroke);
  border-radius: 20px;
  background-color: var(--bright-vream);
  color: var(--primary-text-color);
  text-decoration: none;
  font-size: 15px;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.home-pill:hover {
  border-color: var(--primary-green);
  background-color: var(--secondary-green);
}

@media (max-width: 1079px) {
  .home-persona-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .home-persona-card {
    padding: 16px 24px;
  }
}
</style>
