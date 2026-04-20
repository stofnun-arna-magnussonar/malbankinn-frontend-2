<template>
    <div>
      <p
        class="item-title"
        :class="{ 'left-aligned': clickableTitles }"
        v-html="item.title[activeLanguage]"
      ></p>
  
      <p
        v-if="includeAbout && item.about"
        class="about-item"
        v-html="item.about[activeLanguage]"
      ></p>
      <div
        v-if="includeAbout && item.description"
        class="about-item"
        v-html="item.description[activeLanguage]"
      ></div>
  
      <div v-if="!clickableTitles" class="item-version-links">
        <div class="item-version-link" v-for="(url, index) in item.url" :key="index">
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
  
          <a
            v-else-if="url.type === 'github'"
            class="item-link item-url-img"
            :href="url.url"
            target="_blank"
            title="GitHub"
          >
            <img src="@/assets/img/github-mark/github-mark.png" />
          </a>
  
          <a
            v-else-if="url.type === 'huggingface'"
            class="item-link item-url-img"
            :href="url.url"
            target="_blank"
            title="Hugging Face"
          >
            <img src="@/assets/img/hf-logo.png" />
          </a>
  
          <a
            v-else-if="url.type === 'search'"
            class="item-link item-url-img external-url-img"
            :href="url.url"
            target="_blank"
            :title="$translate('itemsContainerSearchSite')"
          >
            <img src="/public/symbols/search-icon.svg" />
          </a>
  
          <a
            v-else
            :href="url.url"
            target="_blank"
            class="item-link"
          >
            <img
              class="link-image"
              src="@/assets/img/clarin-cropped.png"
              :title="$translate('itemsContainerRepository')"
            />
          </a>
  
          <p class="items-separator" v-if="index < item.url.length - 1">|</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['item', 'clickableTitles', 'activeLanguage', 'includeAbout']);
  </script>
  