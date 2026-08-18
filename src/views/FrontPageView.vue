<template>
  <div class="front-page">

    <!-- Hero -->
    <div class="hero">
      <h1 class="hero-title">{{ t.heroTitle }}</h1>
      <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
    </div>

    <!-- Use cases -->
    <div class="use-cases">
      <div class="use-cases-header">
        <h2 class="use-cases-title">{{ t.whatAreYouDoing }}</h2>
      </div>

      <!-- Hagnýtar lausnir -->
      <div class="use-case-group">
        <p class="group-label">{{ t.practicalLabel }}</p>
        <p class="use-cases-filter-hint filter-hint-desktop" v-show="selectedFilter !== 'software'">
          <svg class="filter-hint-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          {{ t.filterHint }}
        </p>
        <p class="use-cases-filter-hint filter-hint-mobile" v-show="selectedFilter !== 'software'">
          <svg class="filter-hint-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          {{ t.filterHintMobile }}
        </p>
        <div class="use-case-grid">
          <div
            class="use-case-card use-case-card--practical"
            v-for="card in practicalCards"
            :key="card.task.is"
          >
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">
              →
              <template v-for="(resource, index) in normalizeResources(card)" :key="resource.label">
                <RouterLink v-if="resource.link" class="card-resources-link regular-text" :to="buildLink(resource.link)">{{ resource.label }}</RouterLink>
                <span v-else>{{ resource.label }}</span>
                <span v-if="index < normalizeResources(card).length - 1"> · </span>
              </template>
            </p>
          </div>
        </div>
      </div>

      <!-- Máltækniþróun og rannsóknir -->
      <div class="use-case-group research-group" v-show="selectedFilter !== 'software'">
        <p class="group-label">{{ t.researchLabel }}</p>
        <div class="use-case-grid">
          <div class="use-case-card use-case-card--research" v-for="card in researchCards" :key="card.task.is">
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">
              →
              <template v-for="(resource, index) in normalizeResources(card)" :key="resource.label">
                <RouterLink v-if="resource.link" class="card-resources-link regular-text" :to="buildLink(resource.link)">{{ resource.label }}</RouterLink>
                <span v-else>{{ resource.label }}</span>
                <span v-if="index < normalizeResources(card).length - 1"> · </span>
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Category footer -->
    <div class="category-section">
      <div class="category-section-header">
        <h2 class="category-section-title">{{ t.browseTitle }}</h2>
        <p class="category-section-subtitle">{{ t.browseSubtitle }}</p>
      </div>
    <div class="category-footer">
      <RouterLink class="cat-link" :to="`/${lang}/malfong/malheildir`">
        <p class="cat-title">{{ t.catMalheildir }}</p>
        <p class="cat-desc">{{ t.catMalheildirDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/malfong/ordabaekur`">
        <p class="cat-title">{{ t.catOrdabaekur }}</p>
        <p class="cat-desc">{{ t.catOrdabaekurDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/malfong/hugbunadur`">
        <p class="cat-title">{{ t.catHugbunadur }}</p>
        <p class="cat-desc">{{ t.catHugbunadurDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/verkfaeri`" :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }">
        <p class="cat-title">{{ t.catVerkfaeri }}</p>
        <p class="cat-desc">{{ t.catVerkfaeriDesc }}</p>
      </RouterLink>
    </div>
    </div>

  </div>
</template>

<script>
import { useGlobalConfigStore } from '@/stores/globalConfig'

const translations = {
  is: {
    heroTitle: 'Íslensk máltækni – tilbúin til notkunar',
    heroSubtitle: 'Ertu með hugmynd að lausn sem felur í sér íslenskan texta eða tal? Hér finnur þú þau gögn, tól og líkön sem þú þarft, flest opin og tilbúin til niðurhals.',
    whatAreYouDoing: 'Hvað langar þig að gera?',
    clickToFind: 'Smelltu á verkefni til að sjá hvaða verkfæri henta',
    practicalLabel: 'Hagnýtar lausnir',
    researchLabel: 'Máltækniþróun og rannsóknir',
    catMalheildir: 'Málheildir',
    catMalheildirDesc: 'Söfn texta og talaðs máls',
    catOrdabaekur: 'Orðasöfn',
    catOrdabaekurDesc: 'Orðabækur, orðanet og orðalistar',
    catHugbunadur: 'Líkön og tól',
    catHugbunadurDesc: 'Tilbúin til áframhaldandi þróunar',
    catVerkfaeri: 'Vefviðmót',
    catVerkfaeriDesc: 'Leitar- og greiningarvefir',
    browseTitle: 'Eða vafraðu eftir flokki',
    browseSubtitle: 'Skoðaðu safnið eftir tegund efnis',
    filterHint: 'Kveiktu á síunni til hliðar til að sjá eingöngu hagnýtar lausnir.',
    filterHintMobile: 'Kveiktu á síunni í valmyndinni til að sjá eingöngu hagnýtar lausnir.',
  },
  en: {
    heroTitle: 'Icelandic language technology – ready to use',
    heroSubtitle: 'Do you have an idea for a solution involving Icelandic text or speech? Here you will find the data, tools, and models you need – most open and ready to download.',
    whatAreYouDoing: 'What are you working on?',
    clickToFind: 'Click on a task to find which tools are relevant',
    practicalLabel: 'Practical solutions',
    researchLabel: 'LT development & research',
    catMalheildir: 'Corpora',
    catMalheildirDesc: 'Collections of text and spoken language',
    catOrdabaekur: 'Lexicons',
    catOrdabaekurDesc: 'Dictionaries, wordnets, and word lists',
    catHugbunadur: 'Models and tools',
    catHugbunadurDesc: 'Ready-made for further development',
    catVerkfaeri: 'Web interfaces',
    catVerkfaeriDesc: 'Search and analysis tools',
    browseTitle: 'Or browse by category',
    browseSubtitle: 'Explore the collection by type of content',
    filterHint: 'Turn on the filter to the side to see only practical solutions.',
    filterHintMobile: 'Turn on the filter in the menu to see only practical solutions.',
  }
}

export default {
  name: 'FrontPageView',
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      practicalCards: [
        {
          task: { is: 'Fínþjálfa mállíkan fyrir íslensku', en: 'Fine-tune a language model for Icelandic' },
          resources: 'Risamálheildin 2024 síuð',
          link: '/malfong/markadar_einmalamalheildir#sub_risamalheildin'
        },
        {
          task: { is: 'Láta forrit lesa íslenskan texta upphátt', en: 'Make software read Icelandic text aloud' },
          resources: [
            { label: 'Piper TTS', link: '/malfong/talgerving#sub_talgerving_likon' },
            { label: 'Regína – textanormari', link: '/malfong/talgerving#sub_talgerving_studningstol' }
          ],
        },
        {
          task: { is: 'Bæta yfirlestur og málfarsleiðréttingu', en: 'Improve proofreading and grammar correction' },
          resources: 'GreynirCorrect',
          link: '/malfong/malryni#sub_malrynir_likon'
        },
        {
          task: { is: 'Finna nöfn, fyrirtæki og staði í texta', en: 'Find names, companies, and places in text' },
          resources: 'Icelandic NER API',
          link: '/malfong/stodtol#stodtol_markarar_og_lemmold'
        },
        {
          task: { is: 'Bæta leit á íslensku m.t.t. fallbeygingar og samsettra orða', en: 'Improve search on Icelandic text, considering grammatical forms and compound words' },
          resources: 'GreynirEngine',
          link: '/malfong/stodtol#stodtol_markarar_og_lemmold'
        },
        {
          task: { is: 'Umrita íslenskt tal í texta', en: 'Transcribe Icelandic speech into text' },
          resources: 'Whisper-líkan',
          link: '/malfong/talgreining#sub_mallikon'
        },
      ],
      researchCards: [
        {
          task: { is: 'Byggja á grunnlíkani fyrir greiningu á íslensku', en: 'Build on a foundation model for analyzing Icelandic' },
          resources: 'IceBERT',
          link: '/malfong/greinandi_mallikon'
        },
        {
          task: { is: 'Meta og bera saman máltæknilíkön', en: 'Evaluate and compare language technology models' },
          resources: [
            { label: 'IceEval', link: '/malfong/stodtol#stodtol_throunar_og_matstol' },
            { label: 'MOSI', link: '/malfong/talgerving#sub_talgerving_studningstol' }
          ]
        },
        {
          task: { is: 'Byggja talgreini eða þjálfa rödd', en: 'Build a speech recognizer or train a voice' },
          resources: [
            { label: 'Talrómur – TTS líkan', link: '/malfong/talgerving#sub_talgerving_likon' },
            { label: 'MAFIA', link: '/malfong/stodtol#ymis_verkfaeri_fyrir_talgreiningu_og_talgervingu' },
            { label: 'Revoxx', link: '/malfong/talgerving#sub_talgerving_studningstol' }
          ]
        },
        {
          task: { is: 'Greina setningagerð eða flokka orð', en: 'Analyse sentence structure or POS tagging' },
          resources:
          [
            { label: 'IceParser', link: '/malfong/stodtol#thattarar' },
            { label: 'ABL-tagger', link: '/malfong/stodtol#stodtol_markarar_og_lemmold' }
          ]
        },
        {
          task: { is: 'Rannsaka orðtíðni, orðasambönd og afmörkuð textasöfn', en: 'Research word frequency and language use' },
          resources: 'Orðtíðnivefur · N-stæðuskoðarinn',
          link: '/verkfaeri'
        },
        {
          task: { is: 'Smíða og nota málfræðilega mörkuð gögn', en: 'Build and use linguistically annotated data' },
          resources: 'MÍM-GULL · MÍM-GULL-NER',
          link: '/malfong/vidmidungargogn_fyrir_afkastaprofun_storra_mallikana#sub_gullstadlar'
        },
      ],
    }
  },
  computed: {
    lang() {
      return this.globalConfigStore.activeLanguage
    },
    t() {
      return translations[this.lang] || translations.is
    },
    selectedFilter() {
      return this.globalConfigStore.selectedFilter
    }
  },
  methods: {
    buildLink(link) {
      const [path, hash] = link.split('#')
      return { path: `/${this.lang}${path}`, hash: hash ? `#${hash}` : undefined }
    },
    normalizeResources(card) {
      if (Array.isArray(card.resources)) return card.resources
      return [{ label: card.resources, link: card.link }]
    }
  }
}
</script>

<style scoped>
.front-page {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-title {
  font-family: 'RecklessMedium';
  font-size: 40px;
  line-height: 1.15;
  white-space: pre-line;
}

.hero-subtitle {
  font-size: 16px;
  max-width: 620px;
}

/* Use cases */
.use-cases {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.use-cases-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.use-cases-title {
  font-family: 'RecklessMedium';
  font-size: 28px;
}

.use-cases-subtitle {
  font-size: 14px;
  color: var(--medium-grey);
  font-style: italic;
}

.use-cases-filter-hint {
  font-size: 13px;
  color: var(--medium-grey);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-hint-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.use-case-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.research-group {
  transition: opacity 0.2s;
}

.research-group[style*="display: none"] {
  opacity: 0;
}

.group-label {
  font-family: 'RecklessMedium';
  font-size: 20px;
  font-style: normal;
  color: var(--primary-green);
}

.use-case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.use-case-card {
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.use-case-card--practical {
  background-color: #fdf0e8;
  border: 1.5px solid #c8633a;
}

.use-case-card--research {
  background-color: #e8eef4;
  border: 1.5px solid #4a6a8a;
}

.card-resources-link {
  color: var(--primary-green);
  text-decoration: underline;
  cursor: pointer;
}

.card-task {
  font-size: 15px;
  font-style: normal;
}

.card-resources {
  font-size: 13px;
  color: var(--medium-grey);
  font-style: normal;
}

/* Category footer */
.category-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-section-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-section-title {
  font-family: 'RecklessMedium';
  font-size: 28px;
  color: var(--primary-green);
}

.category-section-subtitle {
  font-size: 14px;
  color: var(--medium-grey);
  font-style: italic;
}

.category-footer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}

.cat-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: var(--secondary-green);
  border-radius: 10px;
  padding: 20px;
}

.cat-link:hover {
  outline: 1px solid var(--green-border);
}

.cat-title {
  font-family: 'RecklessMedium';
  font-size: 16px;
}

.cat-desc {
  font-size: 13px;
  color: var(--medium-grey);
}

.filter-hint-mobile {
  display: none;
}

@media (max-width: 887px) {
  .filter-hint-desktop {
    display: none;
  }
  .filter-hint-mobile {
    display: flex;
  }
}

@media (max-width: 887px) {
  .front-page {
    gap: 40px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .use-case-grid {
    grid-template-columns: 1fr;
  }

  .category-footer {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .category-footer {
    grid-template-columns: 1fr;
  }
}
</style>
