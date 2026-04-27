<template>
  <div class="items-container">
    <component
      v-for="item in items"
      :key="item.id"
      :is="getComponentType(item)"
      class="item-container item regular-text"
      :class="{ 'unclickable-item': !clickableTitles && !internalMoreInfoUrl(item) }"
      v-bind="getComponentProps(item)"
    >
      <div v-if="item.best_model" class="best-model-ribbon">🥇</div>
      <p class="item-title" :class="{ 'left-aligned': clickableTitles || internalMoreInfoUrl(item) }" v-html="item.title[activeLanguage]"></p>

      <p v-if="includeAbout && item.about" class="about-item" v-html="item.about[activeLanguage]"></p>
      <div v-if="includeAbout && item.description" class="about-item" v-html="item.description[activeLanguage]"></div>

      <div v-if="!clickableTitles && displayedUrls(item).length > 0" class="item-version-links">
        <div class="item-version-link" v-for="(url, index) in displayedUrls(item)" :key="index">
          <RouterLink
            v-if="url.type === 'more_info' && !URLIsExternal(url.url)"
            :to="`/${$route.params.lang}${url.url}`"
            class="item-link info-link item-url-img external-url-img"
            :title="$translate('itemsContainerMoreInfo')"
          >
            <img src="/public/symbols/external.svg" />
          </RouterLink>

          <a
            v-else-if="url.type === 'more_info'"
            :href="url.url"
            target="_blank"
            rel="noopener noreferrer"
            class="item-link info-link item-url-img external-url-img"
            :title="$translate('itemsContainerMoreInfo')"
          >
            <img src="/public/symbols/external.svg" />
          </a>

          <a v-else-if="url.type === 'github'" :href="url.url" target="_blank" title="GitHub" class="item-link item-url-img">
            <img src="@/assets/img/github-mark/github-mark.png" />
          </a>

          <a v-else-if="url.type === 'huggingface'" :href="url.url" target="_blank" title="Hugging Face" class="item-link item-url-img">
            <img src="@/assets/img/hf-logo.png" />
          </a>

          <a v-else-if="url.type === 'search'" :href="url.url" target="_blank" class="item-link item-url-img external-url-img" :title="$translate('itemsContainerSearchSite')">
            <img src="/public/symbols/search-icon.svg" />
          </a>

          <a v-else :href="url.url" target="_blank" class="item-link">
            <img class="link-image" src="@/assets/img/clarin-cropped.png" :title="$translate('itemsContainerRepository')" />
          </a>

          <p class="items-separator" v-if="index < displayedUrls(item).length - 1">|</p>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import { useGlobalConfigStore } from "@/stores/globalConfig";
export default {
  name: "ItemsContainer",
  props: {
    items: {
      type: Object,
      required: true,
    },
    includeAbout: {
      type: Boolean,
      required: false,
      default: false,
    },
    clickableTitles: {
      type: Boolean,
      required: false,
      default: false,
    },
    activeLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      globalConfigStore: useGlobalConfigStore(),
    };
  },
  computed: {
    baseURL() {
      return this.globalConfigStore.baseURL;
    },
  },
  methods: {
    goToItem(item) {
      if (this.clickableTitles) {
        this.$router.push({ name: "gogn", params: { name: item } });
      }
    },
    URLIsExternal(url) {
      const baseURL = this.baseURL;
      return url.startsWith("http") && !url.includes(baseURL);
    },
    internalMoreInfoUrl(item) {
      if (!Array.isArray(item.url)) return null;
      const entry = item.url.find(u => u.type === 'more_info' && !u.url.startsWith('http'));
      return entry ? entry.url : null;
    },
    displayedUrls(item) {
      if (!Array.isArray(item.url)) return [];
      const internalUrl = this.internalMoreInfoUrl(item);
      if (internalUrl) {
        return item.url.filter(u => !(u.type === 'more_info' && !u.url.startsWith('http')));
      }
      return item.url;
    },
    getComponentType(item) {
      if (this.clickableTitles) {
        return item.url ? 'a' : 'RouterLink'
      }
      if (this.internalMoreInfoUrl(item)) return 'RouterLink';
      return 'div';
    },
    getComponentProps(item) {
      if (this.clickableTitles) {
        if (item.url) {
          return { href: item.url, target: '_blank', rel: 'noopener' }
        }
        return { to: `/${this.activeLanguage}/gogn/${item.id}` }
      }

      const internalUrl = this.internalMoreInfoUrl(item);
      if (internalUrl) {
        return { to: `/${this.activeLanguage}${internalUrl}` }
      }

      return {}
    }
  },
};
</script>

<style scoped>
.items-container {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  /* max-height: 50vh; */
  overflow-y: auto;
  padding: 1px;
}

.item-container:not(.unclickable-item):hover {
  outline: 1px solid var(--green-border);
}

.item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* text-align: center; */
}

.item-container {
  display: grid;
  position: relative;
  overflow: hidden;
  /* grid-auto-rows: 1fr; */
  background-color: var(--bright-vream);
  border-radius: 10px;
  padding: 32px 48px;
  /* gap: 20px; */
}

.best-model-ribbon {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 24px;
  line-height: 1;
}

.image {
  height: 32px;
  width: 32px;
}

.link-image {
  height: 16px;
  width: auto;
}

.item-version-links {
  display: flex;
  gap: 4px;
  width: fit-content;
  justify-content: center;
  justify-self: center;
  font-family: "RecklessRegular";
}

.item-link {
  pointer-events: auto;
  display: flex;
}

.item-version-link {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.item-version-link > a {
  color: var(--primary-blue);
  text-decoration: none;
}

.item-url-img {
  display: flex;
}

.item-url-img > img {
  height: 1rem;
  width: auto;
}

.about-item {
  text-align: start;
}

.about-item p + p {
  margin-top: 0.75em;
}

.clickable-title {
  color: var(--primary-text-color);
}

.clickable-title:hover {
  text-decoration: underline;
  cursor: pointer;
}

.item-title {
  font-family: "RecklessMedium";
  font-size: 20px;
  justify-self: center;
  /* align-self: center; */
}

.left-aligned {
  align-self: flex-start;
  text-align: left;
}

.item-title-container {
  text-align: start;
}

.items-separator {
  font-size: 1.2rem;
  color: var(--primary-green);
}

/* .unclickable-item {
  pointer-events: none;
} */

.clickable-item {
  pointer-events: auto;
}

@media (max-width: 966px) {
  .items-container {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 1441px) {
  .items-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
