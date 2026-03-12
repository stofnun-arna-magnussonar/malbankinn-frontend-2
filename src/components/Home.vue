<template>
  <div class="home-container">
    <div class="home-title-container">
      <h1 class="main-header" v-html="$translate('malbankinnTitle')"></h1>
      <h2 class="sub-header" v-html="$translate('homeInfoTitle')"></h2>
      <p v-html="$translate('homeInfo')"></p>
    </div>
    <div class="home-links">
      <RouterLink class="home-link regular-text" :to="`/${$route.params.lang}/hugvisindi`">
        <div class="home-item-container hoverable-main-container">
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homeResourcesForHumanitiesTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">
              {{ $translate('homeResourcesForHumanitiesContent') }}
            </p>
          </div>
        </div>
      </RouterLink>

      <RouterLink class="home-link regular-text" :to="`/${$route.params.lang}/maltaeknilausnir`">
        <div class="home-item-container hoverable-main-container">
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homePracticalLTSolutionsTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">
              {{ $translate('homePracticalLTSolutionsContent') }}
            </p>
          </div>
        </div>
      </RouterLink>



      <RouterLink class="home-link regular-text" :to="`/${$route.params.lang}/ordalistar`">
        <div class="home-item-container hoverable-main-container">
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homeDictionariesAndListsTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">
              {{ $translate('homeDictionariesAndListsContent') }}
            </p>
          </div>
        </div>
      </RouterLink>

      <RouterLink class="home-link regular-text" :to="`/${$route.params.lang}/nams_og_kennsluefni`">
        <div class="home-item-container hoverable-main-container">
          <div class="home-text-container">
            <h1 class="secondary-header">{{ $translate('homeTeachingMaterialTitle') }}</h1>
          </div>
          <div class="home-item-lower-row">
            <p class="home-description-text">
              {{ $translate('homeTeachingMaterialContent') }}
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
    <!-- <RouterLink class="scholar-of-the-month-home-container regular-text"
      :to="{ name: 'fraedimadur-manadarins', params: { time: newestScholarOfTheMonthKey, lang: is } }">
      <img class="current-scholar-image" :src="currentScholarOfTheMonth.img">
      <div class="current-scholar">
        <p class="current-scholar-title" v-html="$translate('spotlight')"></p>
        <div class="current-scholar-info">
          <p class="current-scholar-name" v-html="currentScholarOfTheMonth.name"></p>
          <p class="current-scholar-description" v-html="currentScholarOfTheMonth.description.is"></p>
        </div>
        <button class="go-to-scholar-button global-more-button">
          <p>{{$translate('seeMore')}} →</p>
        </button>
      </div>
    </RouterLink> -->
  </div>
</template>

<script>
import getMonthAndYear from '@/helperFunctions/timeFunctions.js';
import scholars_of_the_month from '@/data/scholars_of_the_month.json';
import { useGlobalConfigStore } from '@/stores/globalConfig';
export default {
  data() {
    return {
      globalConfigStore: useGlobalConfigStore()
    }
  },
  computed: {
    scholarTime() {
      return getMonthAndYear()
    },
    newestScholarOfTheMonthKey() {
      let ks = Object.keys(scholars_of_the_month)
      return ks[0]
    },
    currentScholarOfTheMonth() {
      return scholars_of_the_month[this.newestScholarOfTheMonthKey]
      // if (!scholars_of_the_month[this.scholarTime]) {
      //   let ks = Object.keys(scholars_of_the_month)
      //   let k = ks[ks.length-1]
      //   return scholars_of_the_month[k]
      // }
      // return scholars_of_the_month[this.scholarTime]
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    }
  }
}

</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-links {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  grid-auto-rows: 1fr;
  width: 100%;
}



.home-header {
  font-size: 2rem;
}

.home-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
}

.home-item-container {
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
  background-color: var(--sky-blue);
  border: none;
}

.home-item-container:hover {
  outline: 1px solid var(--blue-border);
}


.home-description-text {
  margin-top: auto;
  margin-bottom: auto;
}

.home-title {
  font-size: 48px;
  line-height: 110%;
}

.home-title-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding-bottom: 5px;
  gap: 16px;
}

.cat-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-image {
  height: 128px;
}

.scholar-of-the-month-home-container {
  background-color: var(--bright-vream);
  margin-top: 40px;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  cursor: pointer;
  color: var(--primary-text-color);
  text-decoration: none;
  gap: 32px;
  width: 100%;
}

.scholar-of-the-month-home-container:hover {
  outline: 1px solid var(--primary-green);
}

.scholar-of-the-month-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-scholar-title {
  width: fit-content;
  font-family: 'Inter';
  font-size: 16px;
  color: var(--medium-grey);
}

.current-scholar-name {
  font-size: 36px;
}

.current-scholar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
}

.current-scholar-info {
  align-self: center;
}

.go-to-scholar-button {
  margin-top: auto;
  width: 136px;
  justify-content: center;
  white-space: nowrap;
}
@media (max-width: 1079px) {
  .home-links {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .home-subtitle {
    border-bottom: none;
  }

  .home-item-lower-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .scholar-of-the-month-home-container {
    flex-direction: column;
  }
  .current-scholar-image {
    height: 180px;
    width: auto;
    object-fit: cover;
  }
  .home-item-container  {
    padding: 16px 24px;
  }
}

.current-scholar-image {
  border-radius: 8px;
  height: 180px;
  width: auto;
  object-fit: cover;
}

</style>