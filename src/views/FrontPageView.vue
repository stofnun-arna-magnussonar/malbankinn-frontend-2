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
          <div class="use-case-card" v-for="card in practicalCards" :key="card.task.is">
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">→ <em>{{ card.resources }}</em></p>
          </div>
        </div>
      </div>

      <!-- Máltækniþróun og rannsóknir -->
      <div class="use-case-group" :style="{ visibility: globalConfigStore.selectedFilter === 'software' ? 'hidden' : 'visible' }">
        <p class="group-label">{{ t.researchLabel }}</p>
        <div class="use-case-grid">
          <div class="use-case-card" v-for="card in researchCards" :key="card.task.is">
            <p class="card-task">{{ card.task[lang] }}</p>
            <p class="card-resources">→ <em>{{ card.resources }}</em></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Category footer -->
    <div class="category-footer">
      <RouterLink class="cat-link" :to="`/${lang}/malfong/malheildir`">
        <p class="cat-title">{{ t.catMalheildir }}</p>
        <p class="cat-desc">{{ t.catMalheildirDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/malfong/ordabaekur`">
        <p class="cat-title">{{ t.catOrdabaekur }}</p>
        <p class="cat-desc">{{ t.catOrdabaekurDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/verkfaeri`">
        <p class="cat-title">{{ t.catVerkfaeri }}</p>
        <p class="cat-desc">{{ t.catVerkfaeriDesc }}</p>
      </RouterLink>
      <RouterLink class="cat-link" :to="`/${lang}/malfong/hugbunadur`">
        <p class="cat-title">{{ t.catHugbunadur }}</p>
        <p class="cat-desc">{{ t.catHugbunadurDesc }}</p>
      </RouterLink>
    </div>

  </div>
</template>

<script>
import { useGlobalConfigStore } from '@/stores/globalConfig'

const translations = {
  is: {
    heroTitle: 'Íslensk máltækni —\ntilbúin til notkunar',
    heroSubtitle: 'Ertu með hugmynd að lausn sem felur í sér íslenskan texta eða tal? Hér finnurðu tólin og líkönin sem þú þarft — flest opin og tilbúin til niðurhals.',
    whatAreYouDoing: 'Hvað ætlarðu að gera?',
    clickToFind: 'Smelltu á verkefni til að sjá hvaða verkfæri henta',
    practicalLabel: '— Hagnýtar lausnir',
    researchLabel: '— Máltækniþróun og rannsóknir',
    catMalheildir: 'Málheildir',
    catMalheildirDesc: 'Söfn texta og talaðs máls',
    catOrdabaekur: 'Orðasöfn',
    catOrdabaekurDesc: 'Orðabækur, orðanet og orðalistar',
    catVerkfaeri: 'Vefverkfæri',
    catVerkfaeriDesc: 'Leitar- og greiningarvefir',
    catHugbunadur: 'Líkön og tól',
    catHugbunadurDesc: 'Tilbúin og þróunarhæf',
  },
  en: {
    heroTitle: 'Icelandic language technology —\nready to use',
    heroSubtitle: 'Do you have an idea for a solution involving Icelandic text or speech? Here you will find the tools and models you need — most open and ready to download.',
    whatAreYouDoing: 'What are you working on?',
    clickToFind: 'Click on a task to find which tools are relevant',
    practicalLabel: '— Practical solutions',
    researchLabel: '— LT development & research',
    catMalheildir: 'Corpora',
    catMalheildirDesc: 'Collections of text and spoken language',
    catOrdabaekur: 'Lexicons',
    catOrdabaekurDesc: 'Dictionaries, wordnets and word lists',
    catVerkfaeri: 'Foundational tools',
    catVerkfaeriDesc: 'Search and analysis tools',
    catHugbunadur: 'Models and tools',
    catHugbunadurDesc: 'Ready-made and developable',
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
          resources: 'Piper TTS · regina_normalizer'
        },
        {
          task: { is: 'Þýða milli ensku og íslensku á farsíma', en: 'Translate between English and Icelandic on mobile' },
          resources: 'TranslateGemma 4B'
        },
        {
          task: { is: 'Bæta yfirlestur og málfarsleiðréttingu', en: 'Improve proofreading and grammar correction' },
          resources: 'GreynirCorrect'
        },
        {
          task: { is: 'Finna nöfn, fyrirtæki og staði í texta', en: 'Find names, companies and places in text' },
          resources: 'Icelandic NER API'
        },
        {
          task: { is: 'Bæta leit á íslenskum vef', en: 'Improve search on an Icelandic website' },
          resources: 'GreynirEngine'
        },
        {
          task: { is: 'Forvinna texta fyrir aðra málvinnslu', en: 'Preprocess text for other NLP tasks' },
          resources: 'Tokenizer'
        },
      ],
      researchCards: [
        {
          task: { is: 'Þjálfa eða fínstilla málíkán', en: 'Train or fine-tune a language model' },
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

.group-label {
  font-size: 14px;
  font-style: italic;
  color: var(--medium-grey);
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

.card-task {
  font-size: 15px;
}

.card-resources {
  font-size: 13px;
  color: var(--medium-grey);
}

/* Category footer */
.category-footer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid var(--light-grey);
}

.cat-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
