<template>
  <div class="items-container">
    <component
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :is="getComponentType(item)"
      class="item-container item regular-text"
      :class="{ 'unclickable-item': !clickableTitles && !parseItemUrls(item).internalUrl }"
      v-bind="getComponentProps(item)"
    >
      <div class="best-model-ribbon" :class="{ 'best-model-ribbon--hidden': !item.best_model || globalConfigStore.selectedFilter !== 'software' }">
        <template v-if="item.best_model && globalConfigStore.selectedFilter === 'software'">★ {{ $translate("bestModelLabel") }}</template>
      </div>
      <div class="item-text-block">
        <p class="item-title" :class="{ 'left-aligned': clickableTitles || parseItemUrls(item).internalUrl }" v-html="item.title[activeLanguage]"></p>

        <p v-if="item.date" class="item-date"><strong>Dagsetning:</strong> {{ formatDate(item?.date) }}</p>
        <div v-else class="item-date"></div>

        <p v-if="includeAbout && item.about" class="about-item" v-html="item.about[activeLanguage]"></p>
        <div v-if="includeAbout && item.description" class="about-item" v-html="item.description[activeLanguage]"></div>
      </div>

      <div v-if="!clickableTitles && !parseItemUrls(item).internalUrl && parseItemUrls(item).displayedUrls.length > 0" class="item-version-links">
        <div class="item-version-link" v-for="(url, index) in parseItemUrls(item).displayedUrls" :key="index">
          <RouterLink
            v-if="url.type === 'more_info' && !url.url.startsWith('http')"
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

          <a v-else-if="!parseItemUrls(item).internalUrl" :href="url.url" target="_blank" class="item-link">
            <img class="link-image" src="@/assets/img/clarin-cropped.png" :title="$translate('itemsContainerRepository')" />
          </a>

          <p class="items-separator" v-if="index < parseItemUrls(item).displayedUrls.length - 1">|</p>
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
    parseItemUrls(item) {
      if (!Array.isArray(item.url)) return { internalUrl: null, displayedUrls: [] };
      const internalEntry = item.url.find((u) => u.type === "more_info" && !u.url.startsWith("http"));
      const internalUrl = internalEntry ? internalEntry.url : null;
      const displayedUrls = internalUrl ? item.url.filter((u) => !(u.type === "more_info" && !u.url.startsWith("http"))) : item.url;
      return { internalUrl, displayedUrls };
    },
    getComponentType(item) {
      if (this.clickableTitles) {
        return item.url ? "a" : "RouterLink";
      }
      if (this.parseItemUrls(item).internalUrl) return "RouterLink";
      return "div";
    },
    formatDate(date) {
      if (!date) {
        return "";
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
      const [y, m, d] = date.split("-");
      return `${d}.${m}.${y}`;
    },
    getComponentProps(item) {
      if (this.clickableTitles) {
        if (item.url) {
          return { href: item.url, target: "_blank", rel: "noopener" };
        }
        return { to: `/${this.activeLanguage}/gogn/${item.id}` };
      }

      const { internalUrl } = this.parseItemUrls(item);
      if (internalUrl) {
        return { to: `/${this.activeLanguage}${internalUrl}` };
      }

      return {};
    },
  },
};
</script>

<style scoped>
.items-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
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
  position: relative;
  overflow: hidden;
  background-color: var(--bright-vream);
  border-radius: 10px;
  padding: 32px 48px;

  display: grid;
  grid-row: span 5;
  grid-template-rows: subgrid;
  gap: 12px;
}

.best-model-ribbon {
  margin: -32px -48px 16px -48px;
  padding: 6px 48px;
  background-color: #997b2e;
  color: #fbf8ef;
  font-size: 14px;
  font-family: "EB Garamond", Garamond, serif; /* swap to your site's serif */
  font-style: bold;
  text-transform: uppercase;
  align-self: start;
  text-align: center;
}

.best-model-ribbon--hidden {
  background-color: transparent;
  visibility: hidden;
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
  grid-row: 5;
  display: flex;
  gap: 4px;
  width: fit-content;
  justify-content: center;
  justify-self: center;
  align-self: end;
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
  grid-row: 4;
  text-align: start;
  margin: 0;
  align-self: start;
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

.item-text-block {
  display: contents;
}

.item-title {
  grid-row: 2;
  font-family: "RecklessMedium";
  font-size: 20px;
  margin: 0;
}

.item-date {
  grid-row: 3;
  margin: 0;
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
