<template>
  <div class="formats-outer-container">

    <h1 class="main-header" v-html="$translate('formatsInfoTitle')"></h1>
    <div class="about-text-container about-formats" v-html="$translate('formatsInfoDescription')"></div>
    <div class="formats-container">
      <div class="format" v-for="format, key in formatsData">
        <p class="format-title">{{ translationMap[key][activeLanguage] }}</p>
        <div class="format-items">
          <div class="format-item" v-for="f in format">
            <p class="format-id">{{ f.id }}</p>
            <p class="format-level">{{ translationMap[f.level][activeLanguage] }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useGlobalConfigStore } from '@/stores/globalConfig'
export default {
  name: 'FormatsInfo',
  data() {
    return {
      formatsData: null,
      globalConfigStore: useGlobalConfigStore(),
      translationMap: {
        'recommended': {
          'en': 'recommended',
          'is': 'ráðlagt'
        },
        'acceptable': {
          'en': 'acceptable',
          'is': 'ásættanlegt'
        },
        'discouraged': {
          'en': 'discouraged',
          'is': ''
        },
        'Audiovisual Annotation': {
          'en': 'Audiovisual Annotation',
          'is': 'Hljóðmyndræn mörkun'
        },
        'Audiovisual Source Language Data': {
          'en': 'Audiovisual Source Language Data',
          'is': 'Málföng á myndbandssniði'
        },
        'Documentation': {
          'en': 'Documentation',
          'is': 'Skjölun'
        },
        'Image Source Language Data': {
          'en': 'Image Source Language Data',
          'is': 'Málföng á myndasniði'
        },
        'Lexical Resource': {
          'en': 'Lexical Resource',
          'is': 'Orðasöfn'
        },
        'Metadata': {
          'en': 'Metadata',
          'is': 'Lýsigögn'
        },
        'Packaging': {
          'en': 'Packaging',
          'is': 'Samanþjöppuð gögn'
        },
        'Statistical Data': {
          'en': 'Statistical Data',
          'is': 'Tölfræðigögn'
        },
        'Text Annotation': {
          'en': 'Text Annotation',
          'is': 'Textamörkun'
        },
        'Textual Source Language Data': {
          'en': 'Textual Source Language Data',
          'is': 'Málföng á textasniði'
        }
      }
    }
  },
  mounted() {
    this.fetchFormatsData()
  },
  methods: {
    async fetchFormatsData() {
      const dataMap = {}
      const response = await fetch('https://raw.githubusercontent.com/clarin-eric/standards/master/SIS/clarin/data/recommendations/CLARIN-IS-recommendation.xml');

      if (!response.ok) {
        console.error('Eitthvað fór úrskeiðis.');
        return;
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
      const formats = xmlDoc.querySelectorAll('format')
      formats.forEach(format => {
        let domain = format.querySelector('domain').textContent
        let level = format.querySelector('level').textContent
        if (level === 'discouraged') {
          return
        }
        if (!dataMap.hasOwnProperty(domain)) {
          dataMap[domain] = [{ 'id': format.getAttribute('id').substring(1), 'level': level }]
        } else {
          dataMap[domain].push({ 'id': format.getAttribute('id').substring(1), 'level': level })
        }
        let sortedDataMap = Object.keys(dataMap).sort().reduce((acc, key) => {
          acc[key] = dataMap[key].sort((a, b) => a.id.localeCompare(b.id));
          return acc;
        }, {});
        this.formatsData = sortedDataMap
      });
    }
  },
  computed: {
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    }
  }
}

</script>

<style scoped>
.formats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 20px;
}

.format {
  background-color: var(--bright-vream);
  padding: 32px;
  border-radius: 10px;
}

.format-items {
}

.format-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.formats-outer-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-formats {
  display: inline;
}

.format-title {
  font-family: 'RecklessMedium';
}

@media (max-width: 768px) { 
  .formats-container {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1240px) {
  .formats-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1079px) {
  .formats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
  
</style>