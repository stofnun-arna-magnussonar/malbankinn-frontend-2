<template>
  <div class="home-container">

    <div class="home-title-container">
      <h1 class="main-header" v-html="$translate('malbankinnTitle')"></h1>
      <p v-html="$translate('homeInfo')"></p>
    </div>

    <!-- Category cards -->
    <div class="home-cat-grid">
      <RouterLink
        v-for="cat in mainCategoryCards"
        :key="cat.key"
        class="home-cat-card hoverable-main-container lt-item-container regular-text"
        :to="`/${$route.params.lang}/${cat.route}`"
      >
        <p class="secondary-header">{{ cat.name[activeLanguage] }}</p>
        <p v-if="cat.description" class="home-cat-desc">{{ cat.description[activeLanguage] }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { useGlobalConfigStore } from '@/stores/globalConfig';
export default {
  data() {
    return {
      globalConfigStore: useGlobalConfigStore()
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    mainCategoryCards() {
      return [
        {
          key: 'malheildir',
          route: 'malfong/malheildir',
          name: { is: 'Málheildir', en: 'Corpora' },
          description: {
            is: 'Málheild er safn texta eða talaðs máls. Hér má finna málheildir sem nýtast bæði fyrir rannsóknir á sviði hug- og félagsvísinda og til þróunar á máltæknilausnum.',
            en: 'A corpus is a collection of texts or audio. Here you can find corpora that are applicable to both research in the fields of humanities and social science and to language technology development.'
          }
        },
        {
          key: 'ordabaekur',
          route: 'malfong/ordabaekur',
          name: { is: 'Orðasöfn', en: 'Lexicons' },
          description: {
            is: 'Orðabækur, orðanet og orðalistar á íslensku. Hér má nefna veforðabækurnar Íslenska nútímamálsorða og ISLEX-orðabók, beygingarlýsingu íslensks nútímamáls og gagnasöfn undir henni, python-pakka fyrir BÍN, framburðarorðabækur og orðskiptingalista.',
            en: 'Dictionaries, wordnets and wordlists in Icelandic. These include the online dictionaries Dictionary of Contemporary Icelandic and ISLEX, the Database of Icelandic Morphology (BÍN) and databases for that, a python package for BÍN, pronunciation dictionaries and the Icelandic Hyphenation Dictionary.'
          }
        },
        {
          key: 'verkfaeri',
          route: 'verkfaeri',
          name: { is: 'Vefviðmót', en: 'Web interfaces' },
          description: {
            is: 'Hér má finna tvenns konar verkfæri. Annars vegar vefsíður þar sem hægt er að leita í eða greina texta málheilda (einkum Risamálheildarinna) og hins vegar vefsíður sem bjóða upp á forvinnslu texta, t.d. tilreiðslu, mörkun og lemmun.',
            en: 'Here you can find two types of tools. Firstly, websites where users can search and analyze texts found in corpora (the Gigaword Corpus in particular), and secondly, websites that for preprocessing texts, e.g. for tokenization, tagging, and lemmatization.'
          }
        },
        {
          key: 'hugbunadur',
          route: 'malfong/hugbunadur',
          name: { is: 'Líkön og tól', en: 'Models and tools' },
          description: {
            is: 'Hér má finna ýmis tól sem eru gagnleg við þróun á máltæknilausnum. Má þar nefna líkön fyrir vélþýðingu, málrýni, talgervingu, talgreiningu og sjálfvirka hljóðritun, orðvigra (e. word embeddings) og ýmis stoðtól.',
            en: 'Here you can find various tools that are useful for developing language technology solutions. These include models for machine translation, grammar checking, speech synthesis, speech recognition and automatic phonetic transcription, word embeddings and various support tools.'
          }
        }
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

.home-cat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.home-cat-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.home-cat-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

@media (max-width: 768px) {
  .home-cat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
