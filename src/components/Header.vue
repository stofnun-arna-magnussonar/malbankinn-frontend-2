<template>
  <header>
    <div class="header-wrapper">
      <RouterLink class="logo-container" :to="`/${activeLanguage}`">
        <img class="header-logo" src="/symbols/Logo horizontal.svg" />
      </RouterLink>
      <nav class="header-navbar">
        <!-- <RouterLink class="router-link" :to="`/${activeLanguage}`">{{ $translate('headerHome') }}</RouterLink> -->
        <div class="nav-top-group">
          <div class="main-router-links router-links-container">
            <RouterLink class="router-link" :to="`/${activeLanguage}/um`">{{ $translate('headerAbout') }}</RouterLink>
            <RouterLink class="router-link search-nav-link" :to="`/${activeLanguage}/leit`" @click="closeHamburgerMenu">
              <svg class="search-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>{{ $translate('headerSearch') }}
            </RouterLink>
          </div>

          <!-- Sidebar filter -->
          <hr class="sidebar-divider sidebar-divider--tight" />
          <div class="front-page-filter">
            <button
              class="front-page-filter-toggle"
              :class="{ 'front-page-filter-toggle--active': selectedFilter === 'software' }"
              @click="globalConfigStore.setSelectedFilter(selectedFilter === 'software' ? null : 'software')"
              :aria-pressed="selectedFilter === 'software'"
            >
              <span class="toggle-label-group">
                <span class="toggle-label">{{ activeLanguage === 'is' ? 'Hagnýting' : 'Practical use' }}</span>
                <span class="toggle-info-wrapper" ref="infoIcon" @mouseenter="infoHovered = true" @mouseleave="infoHovered = false" @click.stop="toggleInfo">
                  <img v-if="!infoHovered" class="toggle-info-icon" src="/symbols/info-symbol.svg" />
                  <img v-else class="toggle-info-icon" src="/symbols/info-symbol-fill.svg" />
                </span>
                <Teleport to="body">
                  <span v-if="infoOpen" class="toggle-tooltip-fixed" :style="tooltipStyle">{{ activeLanguage === 'is' ? 'Hagnýting sýnir gögn og tól sem henta til notkunar í vörum og verkefnum, t.d. fyrir talgreiningu, vélþýðingu, leiðréttingu og leit. Slökktu á síunni til að sjá allt safnið, þar með talin gögn og tól fyrir rannsóknir og frekari þróun máltækniinnviða.' : 'Practical use shows data and tools suited for use in products and projects, e.g. for speech recognition, machine translation, correction, and search. Turn off the filter to see the full collection, including data and tools for research and further development of language technology infrastructure.' }}</span>
                </Teleport>
              </span>
              <span class="toggle-switch">
                <span class="toggle-knob"></span>
              </span>
            </button>
          </div>
          <hr class="sidebar-divider sidebar-divider--tight" />

          <div class="lr-router-links router-links-container">
          <p class="header-text">{{ $translate('headerResources') }}</p>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/malfong/malheildir`" @click="closeHamburgerMenu" v-html="mainCategories.malheildir.name[activeLanguage]"></RouterLink>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/malfong/ordabaekur`" @click="closeHamburgerMenu" v-html="mainCategories.ordabaekur.name[activeLanguage]"></RouterLink>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/malfong/hugbunadur`" @click="closeHamburgerMenu" v-html="mainCategories.hugbunadur.name[activeLanguage]"></RouterLink>
          <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link" :to="`/${activeLanguage}/verkfaeri`" @click="closeHamburgerMenu">{{ $translate('headerTools') }}</RouterLink>
          </div>
          <div class="lr-router-links router-links-container" style="margin-top: 32px;">
            <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link" :to="`/${activeLanguage}/nams_og_kennsluefni`" @click="closeHamburgerMenu">{{ $translate('homeTeachingMaterialTitle') }}</RouterLink>
            <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link" :to="`/${activeLanguage}/afhending`" @click="closeHamburgerMenu">{{ $translate('headerSubmissions') }}</RouterLink>
          </div>
        </div>

        <!-- <div class="hamburger-menu" ref="hamburgerMenu">
          <div @click="resourcesMenuIsOpen = !resourcesMenuIsOpen" class="dropdown-button">
            <p class="dropdown-button-text">{{ $translate('headerResources') }}<span
                class="dropdown-button-arrow">↴</span></p>
          </div>

          <transition name="dropdown-fade">
            <nav v-if="resourcesMenuIsOpen" class="dropdown">
              <ul>
                <li>
                  <RouterLink :to="`/${activeLanguage}/malheildir`" @click="closeHamburgerMenu">{{ $translate('headerCorpora') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="`/${activeLanguage}/verkfaeri`" @click="closeHamburgerMenu">{{ $translate('headerTools') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="`/${activeLanguage}/maltaeknilausnir`" @click="closeHamburgerMenu">{{ $translate('headerLTSolutions') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="`/${activeLanguage}/ordalistar`" @click="closeHamburgerMenu">{{ $translate('headerLexicons') }}</RouterLink>
                </li>
                <li v-if="selectedFilter !== 'software'">
                  <RouterLink :to="`/${activeLanguage}/afhending`" @click="closeHamburgerMenu">{{ $translate('headerSubmissions') }}</RouterLink>
                </li>
              </ul>
            </nav>
          </transition>
        </div> -->
      </nav>
      <div class="language-selector" style="margin-top: auto;">
        <button class="language-button" v-if="activeLanguage === 'en'" @click="handleLanguageClick('is')">
          <img class="globe-icon" src="@/assets/img/world-globe-line-icon.svg" />Íslenska
        </button>
        <button class="language-button" v-else-if="activeLanguage === 'is'"  @click="handleLanguageClick('en')">
          <img class="globe-icon" src="@/assets/img/world-globe-line-icon.svg" />English
        </button>
      </div>
      <div class="secondary-logos">
        <a href="https://clarin.is" target="_blank">
          <img class="secondary-logo" src="/symbols/Logo-trans-long-CLARIN-sub2.png" />
        </a>
        <a href="https://arnastofnun.is" target="_blank">
          <img class="secondary-logo" src="/symbols/arnlogo.png" />
        </a>
        </div>
      <!-- <div class="language-selector" ref="languageSelector">
        <div @click="languageMenuIsOpen = !languageMenuIsOpen" class="language-button">
          <img class="lang-icon" src="@/assets/img/world-globe-line-icon.svg" />
        </div>
        <transition name="dropdown-fade">
          <ul v-if="languageMenuIsOpen" class="language-dropdown">
            <li :class="{ 'active-language-in-dropdown': activeLanguage === 'is' }" @click="handleLanguageClick('is')">
              🇮🇸</li>
            <li :class="{ 'active-language-in-dropdown': activeLanguage === 'en' }" @click="handleLanguageClick('en')">
              🇬🇧</li>
          </ul>
        </transition>
      </div> -->
      <!-- <div class="language-selector-container">
        <div class="slider" :class="activeLanguage"></div>
        <div class="language-option" @click="handleLanguageClick('is')">🇮🇸</div>
        <div class="language-option" @click="handleLanguageClick('en')">🇬🇧</div>
      </div> -->
    </div>

    <div class="mobile-header-wrapper">
      <RouterLink class="logo-container" :to="`/${activeLanguage}`">
        <img class="mobile-header-logo" src="/symbols/logof.png" />
      </RouterLink>

      <div @click="mobileHamburgerIsOpen = !mobileHamburgerIsOpen" class="hamburger" aria-label="Valmynd">
        <span :class="{ open: mobileHamburgerIsOpen }"></span>
        <span :class="{ open: mobileHamburgerIsOpen }"></span>
        <span :class="{ open: mobileHamburgerIsOpen }"></span>
      </div>
      <Transition name="burger-menu-slide">
        <div v-if="mobileHamburgerIsOpen" class="mobile-hamburger-menu">
          <div @click="mobileHamburgerIsOpen = false" class="close-mobile-hamburger-button">×</div>
          <div class="mobile-hamburger-content">
            <div class="mobile-hamburger-links">
              <!-- <RouterLink class="router-link regular-text" :to="`/${activeLanguage}`">{{ $translate('headerHome') }}
              </RouterLink> -->
              <RouterLink class="router-link regular-text" :to="`/${activeLanguage}/um`" @click="mobileHamburgerIsOpen=false">{{ $translate('headerAbout') }}
              </RouterLink>
              <RouterLink class="router-link regular-text" :to="`/${activeLanguage}/leit`" @click="mobileHamburgerIsOpen=false">{{ $translate('headerSearch')
                }}
              </RouterLink>
            </div>
            <div class="mobile-hamburger-links">
              <button
                class="front-page-filter-toggle"
                :class="{ 'front-page-filter-toggle--active': selectedFilter === 'software' }"
                @click="globalConfigStore.setSelectedFilter(selectedFilter === 'software' ? null : 'software')"
              >
                <span class="toggle-label-group">
                  <span class="toggle-label">{{ activeLanguage === 'is' ? 'Hagnýting' : 'Practical use' }}</span>
                  <span class="toggle-info-wrapper" @mouseenter="infoHovered = true" @mouseleave="infoHovered = false" @click.stop="toggleInfo">
                    <img v-if="!infoHovered" class="toggle-info-icon" src="/symbols/info-symbol.svg" />
                    <img v-else class="toggle-info-icon" src="/symbols/info-symbol-fill.svg" />
                  </span>
                </span>
                <span class="toggle-switch"><span class="toggle-knob"></span></span>
              </button>
            </div>
            <div class="mobile-hamburger-links">
              <p class="header-text">{{ $translate('headerResources') }}</p>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/malfong/malheildir`" @click="mobileHamburgerIsOpen=false" v-html="mainCategories.malheildir.name[activeLanguage]"></RouterLink>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/malfong/ordabaekur`" @click="mobileHamburgerIsOpen=false" v-html="mainCategories.ordabaekur.name[activeLanguage]"></RouterLink>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/malfong/hugbunadur`" @click="mobileHamburgerIsOpen=false" v-html="mainCategories.hugbunadur.name[activeLanguage]"></RouterLink>
              <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/verkfaeri`" @click="mobileHamburgerIsOpen=false">{{ $translate('headerTools') }}</RouterLink>
            </div>
            <div class="mobile-hamburger-links">
              <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/nams_og_kennsluefni`" @click="mobileHamburgerIsOpen=false">{{ $translate('homeTeachingMaterialTitle') }}</RouterLink>
              <RouterLink :style="{ visibility: selectedFilter === 'software' ? 'hidden' : 'visible' }" class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/afhending`" @click="mobileHamburgerIsOpen=false">{{ $translate('headerSubmissions') }}</RouterLink>
            </div>

          </div>
                <div class="language-selector">
                  <button class="language-button" v-if="activeLanguage === 'en'" @click="handleLanguageClick('is')">
                    <img class="globe-icon" src="@/assets/img/world-globe-line-icon.svg" />Íslenska
                  </button>
                  <button class="language-button" v-else-if="activeLanguage === 'is'"  @click="handleLanguageClick('en')">
                    <img class="globe-icon" src="@/assets/img/world-globe-line-icon.svg" />English
                  </button>
                </div>
          <!-- <div class="language-selector-container mobile-language-selector-container">
            <div class="slider" :class="activeLanguage"></div>
            <div class="language-option" @click="handleLanguageClick('is')">🇮🇸</div>
            <div class="language-option" @click="handleLanguageClick('en')">🇬🇧</div>
          </div> -->
        </div>
      </Transition>
    </div>

  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useGlobalConfigStore } from "@/stores/globalConfig";
import mainCategories from '@/data/mainCat.json'
import subCategories from '@/data/subCat.json'
export default {
  name: 'Header',
  emits: ['language-changed'],
  props: {
    activeLanguageProp: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resourcesMenuIsOpen: false,
      mobileHamburgerIsOpen: false,
      languageMenuIsOpen: false,
      globalConfigStore: useGlobalConfigStore(),
      infoHovered: false,
      infoOpen: false,
      tooltipStyle: {},
      headerSearchQuery: '',
      mainCategories: mainCategories,
      subCategories: subCategories,
      openMainCats: []
    }
  },
  methods: {
    toggleInfo() {
      if (this.infoOpen) {
        this.infoOpen = false
        return
      }
      const rect = this.$refs.infoIcon.getBoundingClientRect()
      const tooltipWidth = 245
      const margin = 8
      const left = Math.min(rect.left, window.innerWidth - tooltipWidth - margin)
      this.tooltipStyle = {
        position: 'fixed',
        top: (rect.bottom + 8) + 'px',
        left: Math.max(margin, left) + 'px',
        zIndex: 9999,
      }
      this.infoOpen = true
      setTimeout(() => {
        window.addEventListener('click', this.closeInfo, { once: true })
      }, 0)
    },
    closeInfo() {
      this.infoOpen = false
    },
    submitSearch() {
      const q = this.headerSearchQuery.trim()
      this.$router.push({ path: `/${this.activeLanguage}/leit`, query: q ? { q } : {} })
    },
    toggleMainCat(key) {
      if (this.openMainCats.includes(key)) {
        this.openMainCats = this.openMainCats.filter(k => k !== key)
      } else {
        this.openMainCats = [...this.openMainCats, key]
      }
    },
    closeHamburgerMenu() {
      this.resourcesMenuIsOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.hamburgerMenu && !this.$refs.hamburgerMenu.contains(event.target)) {
        this.closeHamburgerMenu();
      }
      if (this.$refs.languageSelector && !this.$refs.languageSelector.contains(event.target)) {
        this.closeLanguagemenu();
      }
    },
    closeLanguagemenu() {
      this.languageMenuIsOpen = false
    },
    toggleDropdown() {
      this.languageMenuIsOpen = !this.languageMenuIsOpen;
    },
    handleLanguageClick(lang) {
      // this.globalConfigStore.setActiveLanguage(lang);
      this.closeLanguagemenu();
      this.$emit('language-changed', lang);
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  computed: {
    activeLanguage() {
      return this.activeLanguageProp
    },
    isMobileScreenSize() {
      return this.globalConfigStore.isMobileScreenSize
    },
    selectedFilter() {
      return this.globalConfigStore.selectedFilter
    }
  },
}
</script>

<style scoped>
.header-navbar {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

}

.active-language-in-dropdown {
  background-color: var(--primary-light-blue);
}

/* .header-navbar>a,
.dropdown-button {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s;
  cursor: pointer;
} */

.header-wrapper {
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  background-color: var(--primary-green);
  align-items: center;
  padding-left: 150px;
  padding-right: 150px;
}


.header-logo {
  height: 60px;
}

.mobile-header-logo {
  height: 30px;
}

.router-link {
  position: relative;
  text-decoration: none;
  color: inherit;
  user-select: none;
  width: fit-content;
}

.router-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: var(--primary-green);
  transition: width 0.3s ease-in-out;
}

/* .router-link::after, .dropdown-button::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: var(--secondary-color);
  transition: width 0.3s ease-in-out;
} */

.router-link:not(.router-link-exact-active):hover::after {
  width: 100%;
}

.logo-container {
  cursor: pointer;
}

.logo-container::after {
  display: none;
}

.dropdown-button:hover::after {
  width: 100%;
}

.dropdown-button:hover>p>span {
  color: var(--primary-green);
}

.router-link-active {
  position: relative;
  text-decoration: none;
}

.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-green);
}

.dropdown-button-text {
  font-weight: bold;
  display: flex;
}

.hamburger-menu {
  position: relative;
  padding-bottom: 4px;
}

.mobile-hamburger-menu {
  background-color: var(--bright-vream);
  position: absolute;
  top: 0;
  right: 0;
  height: 100svh;
  width: 100vw;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 64px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;

}

.hamburger span {
  width: 30px;
  height: 3px;
  background: var(--primary-green);
  transition: transform 0.3s ease-in-out;
}

.hamburger .open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger .open:nth-child(2) {
  opacity: 0;
}

.hamburger .open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.dropdown {
  position: absolute;
  top: 30px;
  left: 0;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 180px;
  padding: 10px 0;
  z-index: 1000;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 12px 20px;
  border-bottom: 1px solid #ddd;
}

.dropdown li:last-child {
  border-bottom: none;
}

.dropdown a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.dropdown a:hover {
  color: var(--primary-light-blue);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.language-selector {
  position: relative;
  width: fit-content;
}

.language-button {
  background: none;
  border: none;
  font-size: 13px;
  cursor: pointer;
  width: fit-content;
  color: var(--medium-grey);
  font-family: inherit;
  padding: 0px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.globe-icon {
  height: 14px;
  opacity: 0.6;
}

.language-dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 5px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.language-dropdown li {
  padding: 8px 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.language-dropdown li:hover {
  background: #f0f0f0;
}

.lang-icon {
  height: 24px;
  filter: invert(1)
}

.lang-icon:hover {
  filter: invert(83%) sepia(33%) saturate(5698%) hue-rotate(353deg) brightness(95%) contrast(95%);
}

.close-mobile-hamburger-button {
  margin-left: auto;
  margin-right: 20px;
  margin-top: 10px;
  background-color: var(--primary-green);
  padding: 4px 10px;
  border-radius: 8px;
  color: white;
  font-size: 22px;
  line-height: 1;
}

.mobile-hamburger-links {
  display: grid;
  gap: 15px;
}

/* .mobile-hamburger-link {
  width: fit-content;
  color: var(--primary-green);
  text-decoration: none;
  font-size: 1.4rem;
} */

.language-selector-container {
  position: relative;
  display: flex;
  width: 100px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  justify-content: space-between;
  gap: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.mobile-language-selector-container {
  margin-top: auto;
}

.language-option {
  flex: 1;
  text-align: center;
  z-index: 2;
  font-size: 1.2rem;
}

.slider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: #fff;
  border-radius: 10px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.slider.is {
  transform: translateX(0%);
}

.slider.en {
  transform: translateX(100%);
}

.burger-menu-slide-enter-active {
  animation: slide-from-top 0.5s ease;
}

.burger-menu-slide-leave-active {
  animation: slide-from-top 0.5s reverse;
}

.header-text {
    font-family: 'Inter';
    color: #8D8D8D;
    font-size: 12px;
    text-transform: uppercase;
}

.mobile-hamburger-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.router-link {
    font-family: 'RecklessMedium';
    width: fit-content;
    font-size: 20px;
  }

.secondary-router-link {
  font-size: 16px !important;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid var(--light-grey);
  margin: 8px 0;
}

.sidebar-divider--tight {
  margin: 3px 0;
}

.nav-top-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.front-page-filter {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 0;
  background-color: var(--bright-vream);
  border-radius: 8px;
}

.front-page-filter-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-left: 8px;
  color: var(--medium-grey);
}

.front-page-filter-desc {
  font-size: 11px;
  color: var(--medium-grey);
  padding-left: 2px;
}

.toggle-info-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-info-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  stroke: var(--medium-grey);
  opacity: 0.7;
  transition: stroke 0.15s, opacity 0.15s;
}

.toggle-tooltip-fixed {
  width: 245px;
  background-color: var(--bright-vream);
  color: var(--primary-green);
  border: 1px solid var(--green-border);
  font-size: 12px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  pointer-events: none;
  font-family: 'RecklessRegular';
  font-style: normal;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.toggle-tooltip {
  position: absolute;
  left: 20px;
  top: -8px;
  width: 220px;
  background-color: var(--bright-vream);
  color: var(--primary-green);
  border: 1px solid var(--green-border);
  font-size: 12px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  z-index: 100;
  pointer-events: none;
  font-family: 'RecklessRegular';
  font-style: normal;
}


.front-page-filter-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  background-color: var(--background-color);
  border: none !important;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-family: inherit;
}

.toggle-label-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.toggle-label {
  font-size: 13px;
  color: var(--primary-green);
  text-align: left;
  line-height: 1.3;
}

.toggle-switch {
  flex-shrink: 0;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--light-grey);
  position: relative;
  transition: background-color 0.2s;
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.front-page-filter-toggle--active .toggle-switch {
  background-color: var(--primary-green);
}

.front-page-filter-toggle--active .toggle-knob {
  transform: translateX(16px);
}

.sidebar-main-cat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-main-cat-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'RecklessMedium';
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  color: inherit;
  text-align: left;
}

.sidebar-main-cat-btn > span:first-child {
  flex: 1;
  min-width: 0;
}

.sidebar-chevron {
  display: inline-block;
  transition: transform 0.2s ease;
  font-style: normal;
  font-size: 18px;
  line-height: 1;
}

.sidebar-chevron.rotated {
  transform: rotate(90deg);
}

.sidebar-sub-cats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 12px;
}

.sidebar-sub-cat-link {
  font-family: 'Inter', sans-serif !important;
  font-size: 13px !important;
  color: var(--medium-grey) !important;
}

.search-nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.header-search-form {
  display: flex;
  align-items: center;
  border: 1px solid var(--light-grey);
  border-radius: 8px;
  overflow: hidden;
  background: white;
  width: 100%;
}

.header-search-input {
  border: none;
  outline: none;
  padding: 6px 10px;
  font-size: 14px;
  font-family: inherit;
  flex: 1;
  min-width: 0;
}

.header-search-button {
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--medium-grey);
}


.secondary-logos {
  max-width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
}

.secondary-logo {
  max-width: 100%;
}

@keyframes slide-from-top {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0%);
  }
}

@media (min-width: 888px) and (min-height: 650px) {
  .header-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bright-vream);
    color: var(--primary-green);
    padding-left: 50px;
    padding-right: 70px;
    align-items: start;
    justify-content: start;
    width: 280px;
    gap: 24px;
    justify-content: flex-start;
    overflow-y: scroll;
    padding-bottom: 46px;
  }

  .header-wrapper {
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .header-wrapper::-webkit-scrollbar {
      width: 0;
      height: 0;
  }

  .mobile-header-wrapper {
    display: none;
  }

  .header-navbar {
    display: flex;
    flex-direction: column;
    gap: min(2vh, 32px);
    align-items: start;
    justify-content: start;
    width: 100%;
  }

  .router-links-container {
    display: flex;
    flex-direction: column;
    gap: min(4vh, 32px);
    width: 100%;
  }

  .router-links-container.lr-router-links {
    gap: min(2vh, 24px)
  }

  .logo-container {
    padding: 20px 0px;
    display: flex;
    justify-content: center;
  }
  .header-logo {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }

}

@media (max-width: 887px), (min-width: 888px) and (max-height: 649px) {
  .header-wrapper {
    display: none !important;
  }

  .mobile-header-wrapper {
    background-color: var(--bright-vream);
    height: 60px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
}


</style>