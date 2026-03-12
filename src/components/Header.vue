<template>
  <header>
    <div class="header-wrapper">
      <RouterLink class="logo-container" :to="`/${activeLanguage}`">
        <img class="header-logo" src="/symbols/Logo.svg" />
      </RouterLink>
      <nav class="header-navbar">
        <!-- <RouterLink class="router-link" :to="`/${activeLanguage}`">{{ $translate('headerHome') }}</RouterLink> -->
        <div class="main-router-links router-links-container">
          <RouterLink class="router-link" :to="`/${activeLanguage}/um`">{{ $translate('headerAbout') }}</RouterLink>
        </div>
        <div class="lr-router-links router-links-container">
          <p class="header-text">{{ $translate('headerResources') }}</p>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/malheildir`"
            @click="closeHamburgerMenu">{{ $translate('headerCorpora') }}
          </RouterLink>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/verkfaeri`"
            @click="closeHamburgerMenu">{{ $translate('headerTools') }}
          </RouterLink>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/maltaeknilausnir`"
            @click="closeHamburgerMenu">{{
              $translate('headerLTSolutions') }}</RouterLink>
          <RouterLink class="router-link secondary-router-link" :to="`/${activeLanguage}/ordalistar`"
            @click="closeHamburgerMenu">{{ $translate('headerLexicons')
            }}
          </RouterLink>

        </div>
        <div class="main-router-links router-links-container">
          <RouterLink class="router-link tertiary-router-link" :to="`/${activeLanguage}/afhending`"
            @click="closeHamburgerMenu">{{
              $translate('headerSubmissions')
            }}</RouterLink>
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
                <li>
                  <RouterLink :to="`/${activeLanguage}/afhending`" @click="closeHamburgerMenu">{{ $translate('headerSubmissions') }}</RouterLink>
                </li>
              </ul>
            </nav>
          </transition>
        </div> -->
      </nav>
      <form class="header-search-form" @submit.prevent="submitSearch">
        <button type="submit" class="header-search-button">🔍</button>
        <input class="header-search-input" v-model="headerSearchQuery" placeholder="Leita" />
      </form>
      <div class="language-selector">
        <button class="language-button" v-if="activeLanguage === 'en'" @click="handleLanguageClick('is')">
          Íslenska
        </button>
        <button class="language-button" v-else-if="activeLanguage === 'is'"  @click="handleLanguageClick('en')">
          English
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
          <div @click="mobileHamburgerIsOpen = false" class="close-mobile-hamburger-button">X</div>
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
              <p class="header-text">{{ $translate('headerResources') }}</p>
  
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/malheildir`"
                @click="mobileHamburgerIsOpen=false">{{ $translate('headerCorpora') }}</RouterLink>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/verkfaeri`"
                @click="mobileHamburgerIsOpen=false">{{ $translate('headerTools') }}</RouterLink>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/maltaeknilausnir`"
                @click="mobileHamburgerIsOpen=false">{{ $translate('headerLTSolutions') }}</RouterLink>
              <RouterLink class="router-link secondary-router-link regular-text" :to="`/${activeLanguage}/ordalistar`"
                @click="mobileHamburgerIsOpen=false">{{ $translate('headerLexicons') }}</RouterLink>
            </div>
            <div class="mobile-hamburger-links">
              <RouterLink class="router-link tertiary-router-link regular-text" :to="`/${activeLanguage}/afhending`"
                @click="mobileHamburgerIsOpen=false">{{ $translate('headerSubmissions') }}</RouterLink>
            </div>

          </div>
                <div class="language-selector">
                  <button class="language-button" v-if="activeLanguage === 'en'" @click="handleLanguageClick('is')">
                    Íslenska
                  </button>
                  <button class="language-button" v-else-if="activeLanguage === 'is'"  @click="handleLanguageClick('en')">
                    English
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
      headerSearchQuery: ''
    }
  },
  methods: {
    submitSearch() {
      const q = this.headerSearchQuery.trim()
      this.$router.push({ path: `/${this.activeLanguage}/leit`, query: q ? { q } : {} })
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
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  color: var(--primary-green);
  font-family: 'RecklessMedium';
  padding: 0px;
  margin-top: 24px;
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
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
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
  gap: 64px;
}

.router-link {
    font-family: 'RecklessMedium';
    width: fit-content;
    font-size: 20px;
  }

.secondary-router-link {
  font-size: 16px !important;
}

.tertiary-router-link {
  font-size: 13px !important;
  color: var(--medium-grey);
}

.header-search-form {
  display: flex;
  align-items: center;
  border: 2px solid var(--primary-light-blue, #6fa8dc);
  border-radius: 8px;
  overflow: hidden;
  background: white;
  width: 100%;
}

.header-search-input {
  border: none;
  outline: none;
  padding: 6px 10px;
  font-size: 16px;
  font-family: inherit;
  flex: 1;
  min-width: 0;
}

.header-search-button {
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
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

@media (min-width: 888px) {
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
    /* gap: min(6vh, 236px); */
    justify-content: space-between;
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
    gap: min(3vh, 66px);
    align-items: start;
    justify-content: start;
  }

  .router-links-container {
    display: flex;
    flex-direction: column;
    gap: min(4vh, 32px);
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
    margin-top: 60px;
  }

}

@media (max-width: 887px) {
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