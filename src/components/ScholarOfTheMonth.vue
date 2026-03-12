<template>
  <div>
    <div v-if="currentScholar" class="current-scholar">
      <div class="profile-container">
        <img class="current-scholar-image" :src="currentScholar.img">
        <p class="current-scholar-name" v-html="currentScholar.name"></p>
        <p class="current-scholar-description" v-html="currentScholar.description[activeLanguage]"></p>
      </div>
      <div class="current-scholar-questions">
        <!-- <p class="current-scholar-intro" v-html="currentScholar.intro[activeLanguage]"></p> -->
        <div class="question-container" v-for="question in currentScholar.questions[activeLanguage]">
          <p class="question" v-html="question.question"></p>
          <p class="answer" v-html="question.answer"></p>
        </div>
      </div>
    </div>
  </div>

  <div class="other-scholars-of-the-month-container">
    <h2 class="other-scholars-title"
      v-html="currentScholar ? $translate('spotlightOthersTitle') : $translate('spotlightTitle')">
    </h2>
    <div class="other-scholars">
      <RouterLink :to="{ name: 'fraedimadur-manadarins', params: { time: index } }" class="hoverable-main-container regular-text"
        v-for="scholar, index in otherScholars">
        <img class="other-scholar-image" :src="scholar.img">
        <p class="other-scholar-name" v-html="scholar.name"></p>
        <p class="other-scholar-name">{{ iToMonth[index.slice(0, 2)] }} {{ index.slice(3, 7) }} </p>
      </RouterLink>
      <div class="see-all-scholars-button-container">
        <RouterLink class="all-scholars-link regular-text" :to="{ name: 'fraedimadur-manadarins' }" v-if="currentScholar">
          <p class="see-all-scholars-button global-more-button">{{ $translate('seeAllSpotlight') }} →</p>
        </RouterLink>

      </div>
    </div>
  </div>

</template>

<script>

import scholars_of_the_month from '@/data/scholars_of_the_month.json';
import { useGlobalConfigStore } from '@/stores/globalConfig';

export default {
  name: 'ScholarOfTheMonth',
  props: {
    timeProp: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      scholars: scholars_of_the_month,
      globalConfigStore: useGlobalConfigStore(),
      iToMonth: {
        '01': 'janúar',
        '02': 'febrúar',
        '03': 'mars',
        '04': 'apríl',
        '05': 'maí',
        '06': 'júní',
        '07': 'júlí',
        '08': 'ágúst',
        '09': 'september',
        '10': 'október',
        '11': 'nóvember',
        '12': 'desember'
      }
    }
  },
  computed: {
    time() {
      return this.$router.currentRoute.value.params.time
    },
    currentScholar() {
      if (this.time) {
        return this.scholars[this.time]
      }
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    },
    otherScholars() {
      const now = new Date();
      const currentKey = this.time;

      let os = Object.fromEntries(
        Object.entries(this.scholars)
          .filter(([key]) => {
            if (key === currentKey) return false;

            const [month, year] = key.split('-').map(Number);
            const keyDate = new Date(year, month - 1);

            return keyDate <= now;
          })
      );
      return Object.fromEntries(Object.entries(os).slice(0, 4))
    }
  }
}

</script>

<style scoped>
.current-scholar {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 20px;
}

.current-scholar-image {
  border-radius: 5px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
}

.current-scholar-questions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.current-scholar-name {
  font-size: 1.4rem;
  font-weight: 600;
}

.question {
  font-family: 'RecklessMedium';
}

.current-scholar-description {
  text-align: left;
}

.other-scholars-of-the-month-container {
  padding: 20px;
}

/* .other-scholar {
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 20px;
  background-color: var(--secondary-green);
  color: var(--primary-text-color);
  text-decoration: none;
} */

.other-scholar:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.other-scholar-image {
  height: 180px;
  width: auto;
  object-fit: cover;
  border-radius: 5px;
}

.current-scholar-image {
  border-radius: 8px;
  height: 180px;
  width: auto;
  object-fit: cover;
}

.other-scholars {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.current-scholar-intro {
  padding-bottom: 10px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 0px;
}

.see-all-scholars-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: default;
}

.see-all-scholars-button {
  width: fit-content;
}
.all-scholars-link {
  text-decoration: none;
}



@media (max-width: 768px) {
  .current-scholar {
    display: flex;
    flex-direction: column;
  }

  .current-scholar-image {
    height: 180px;
    width: auto;
    object-fit: cover;
  }

  .other-scholars {
    grid-template-columns: 1fr;
  }
}
</style>