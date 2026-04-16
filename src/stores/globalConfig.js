import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useGlobalConfigStore = defineStore('globalConfig', () => {
    const activeLanguage = ref(localStorage.getItem('language') || 'is')
    console.log(activeLanguage)
    // function setActiveLanguage(language) {
    //     activeLanguage.value = language
    //     localStorage.setItem('language', language)
    // }

    function setActiveLanguage(lang) {
        activeLanguage.value = lang
        localStorage.setItem('language', lang)
      }
    
      function initLanguageFromRoute(route) {
        const lang = route.params.lang
        if (lang && ['is', 'en'].includes(lang)) {
          setActiveLanguage(lang)
        } else {
          // fallback to local storage
          const stored = localStorage.getItem('language') || 'is'
          setActiveLanguage(stored)
        }
      }

    const userLastVisit = ref(localStorage.getItem('lastVisit') || new Date())
    function setUserLastVisit() {
        userLastVisit.value = new Date()
        localStorage.setItem('lastVisit', new Date())
    }

    const userDevice = computed(() => {
        return window.navigator.userAgent
    })

    const screenSize = computed(() => {
        return {'width': window.visualViewport.width, 'height': window.visualViewport.height}
    })

    const isMobileScreenSize = computed(() => {
        return screenSize.value.width < 768
    })

    const userAgent = computed(() => {
        return window.navigator.userAgent
    })

    const baseURL = computed(() => {
        const url = new URL(window.location.href)
        return url.origin
    })


    const selectedFilter = ref(null)
    function setSelectedFilter(filter) {
        selectedFilter.value = filter
    }

    return {
            activeLanguage,
            setActiveLanguage,
            userDevice,
            screenSize,
            isMobileScreenSize,
            userAgent,
            userLastVisit,
            setUserLastVisit,
            baseURL,
            initLanguageFromRoute,
            selectedFilter,
            setSelectedFilter
    }
})