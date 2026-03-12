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
