<template>
  <SingleItem :itemProp="path" :active-language-prop="activeLanguage" />
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import { useGlobalConfigStore } from '@/stores/globalConfig';
import { useRoute } from 'vue-router'
export default {
  components: {
    SingleItem
  },
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
      route: useRoute()
    }
  },
  mounted() {
    this.globalConfigStore.initLanguageFromRoute(this.route)
  },
  computed: {
    path() {
      return this.$router.currentRoute.value.params.name
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    }
  },
  methods: {
    switchLanguage(newLang) {
      this.$router.push({
        name: 'gogn',
        params: {
          lang: newLang,
          name: this.route.params.name
        }
      })
    }
  },
  watch: {
    activeLanguage(newLang) {
      this.switchLanguage(newLang)
    }
  }
}
</script>