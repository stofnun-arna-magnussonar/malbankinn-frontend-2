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
        <p class="use-cases-subtitle">{{ t.clickToFind }}</p>
      </div>

      <!-- Hagnýtar lausnir -->
      <div class="use-case-group">
        <p class="group-label">{{ t.practicalLabel }}</p>
        <div class="use-case-grid">
          <component
            :is="card.link ? 'RouterLink' : 'div'"
            :to="card.link ? buildLink(card.link) : undefined"
            class="use-case-card regular-text"
            :class="{ 'use-case-card--linked': card.link }"
            v-for="card in practicalCards"
            :key="card.task.is"
          >
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">→ {{ card.resources }}</p>
          </component>
        </div>
      </div>

      <!-- Máltækniþróun og rannsóknir -->
      <div class="use-case-group research-group" v-show="selectedFilter !== 'software'">
        <p class="group-label">{{ t.researchLabel }}</p>
        <div class="use-case-grid">
          <div class="use-case-card" v-for="card in researchCards" :key="card.task.is">
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">→ {{ card.resources }}</p>
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
    heroSubtitle: 'Ertu með hugmynd að lausn sem felur í sér íslenskan texta eða tal? Hér finnurðu þau gögn, tól og líkön sem þú þarft, flest opin og tilbúin til niðurhals.',
    whatAreYouDoing: 'Hvað langar þig að gera?',
    clickToFind: 'Smelltu á verkefni til að sjá hvaða verkfæri henta',
    practicalLabel: 'Hagnýtar lausnir',
    researchLabel: 'Máltækniþróun og rannsóknir',
    catMalheildir: 'Málheildir',
    catMalheildirDesc: 'Söfn texta og talaðs máls',
    catOrdabaekur: 'Orðasöfn',
    catOrdabaekurDesc: 'Orðabækur, orðanet og orðalistar',
    catHugbunadur: 'Líkön og tól',
    catHugbunadurDesc: 'Tilbúin og þróunarhæf',
    catVerkfaeri: 'Vefviðmót',
    catVerkfaeriDesc: 'Leitar- og greiningarvefir',
    browseTitle: 'Eða vafraðu eftir flokki',
    browseSubtitle: 'Skoðaðu safnið eftir tegund efnis',
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
    catOrdabaekurDesc: 'Dictionaries, wordnets and word lists',
    catHugbunadur: 'Models and tools',
    catHugbunadurDesc: 'Ready-made and developable',
    catVerkfaeri: 'Web interfaces',
    catVerkfaeriDesc: 'Search and analysis tools',
    browseTitle: 'Or browse by category',
    browseSubtitle: 'Explore the collection by type of content',
  }
}

export default {
  name: 'FrontPageView',
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      practicalCards: [
        {
          task: { is: 'Láta forrit lesa íslenskan texta upphátt', en: 'Make software read Icelandic text aloud' },
          resources: 'Piper TTS · regina_normalizer',
          link: '/malfong/talgerving'
        },
        {
          task: { is: 'Þýða á milli ensku og íslensku', en: 'Translate between English and Icelandic' },
          resources: 'TranslateGemma',
          link: '/malfong/thydingarvelar_og_likon#sub_thydingarlikon'
        },
        {
          task: { is: 'Bæta yfirlestur og málfarsleiðréttingu', en: 'Improve proofreading and grammar correction' },
          resources: 'GreynirCorrect',
          link: '/malfong/malryni#sub_likon_1'
        },
        {
          task: { is: 'Finna nöfn, fyrirtæki og staði í texta', en: 'Find names, companies and places in text' },
          resources: 'Icelandic NER API',
          link: '/malfong/stodtol#stodtol_markarar_og_lemmold'
        },
        {
          task: { is: 'Bæta leit á íslenskum vef', en: 'Improve search on an Icelandic website' },
          resources: 'GreynirEngine',
          link: '/malfong/stodtol#stodtol_markarar_og_lemmold'
        },
        {
          task: { is: 'Forvinna texta fyrir aðra málvinnslu', en: 'Preprocess text for other NLP tasks' },
          resources: 'Tokenizer',
          link: '/malfong/stodtol#sub_tilreidarar'
        },
      ],
      researchCards: [
        {
          task: { is: 'Þjálfa eða fínstilla mállíkan', en: 'Train or fine-tune a language model' },
          resources: 'IceBERT · Risamálheild · GreynirSeq'
        },
        {
          task: { is: 'Meta og bera saman máltæknilíkön', en: 'Evaluate and compare language technology models' },
          resources: 'IceEval · MOSI'
        },
        {
          task: { is: 'Vinna með stór íslensk textasöfn', en: 'Work with large Icelandic text corpora' },
          resources: 'Risamálheild · JSONL-varpari'
        },
        {
          task: { is: 'Byggja talgreini eða þjálfa rödd', en: 'Build a speech recognizer or train a voice' },
          resources: 'Talrómur · MAFIA · Revoxx'
        },
        {
          task: { is: 'Greina setningagerð eða orðflokkun', en: 'Analyse sentence structure or POS tagging' },
          resources: 'IceParser · ABL-tagger'
        },
        {
          task: { is: 'Rannsaka orðtíðni og málnotkun', en: 'Research word frequency and language use' },
          resources: 'Orðtíðnivefur · N-stæðuskoðarinn'
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
  background-color: var(--bright-vream);
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: outline 0.1s;
}

.use-case-card:hover {
  outline: 1px solid var(--green-border);
}

.use-case-card--linked {
  text-decoration: none;
  color: inherit;
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
  transition: outline 0.1s;
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
</style>
