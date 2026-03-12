<template>
  <div class="hugvisindi-container">
    <div class="hugvisindi-text-container single-category-overview-container">
      <h1 class="main-header" v-html="$translate('humanitiesTitle')"></h1>
      <div>
        <p class="diff-pad-r" v-html="$translate('humanitiesContent')"></p>
      </div>

    </div>
    <div class="hugvisindi-links">
      <RouterLink class="hugvisindi-link regular-text" :to="`/${$route.params.lang}/malheildir`">
        <div class="hoverable-main-container">
          <div class="hugvisindi-text-container">
            <h1 class="secondary-header">{{ $translate('humanitiesDataTitle') }}</h1>
          </div>
          <div class="hugvisindi-item-lower-row">
            <p class="hugvisindi-description-text">
              {{ $translate('humanitiesDataContent') }}
            </p>
          </div>
        </div>
      </RouterLink>

      <RouterLink class="hugvisindi-link regular-text" :to="`/${$route.params.lang}/verkfaeri`">
        <div class="hoverable-main-container">
          <div class="hugvisindi-text-container">
            <h1 class="secondary-header">{{ $translate('humanitiesToolsTitle') }}</h1>
          </div>
          <div class="hugvisindi-item-lower-row">
          <p class="hugvisindi-description-text">
            {{ $translate('humanitiesToolsContent') }}
          </p>
          </div>
        </div>
      </RouterLink>    

    </div>
  </div>
</template>

<script>
export default {

}

</script>

<style scoped>
.hugvisindi-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hugvisindi-links {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  grid-auto-rows: 1fr;
  width: 100%;
}


.hugvisindi-header {
  font-size: 2rem;
  padding: 20px 0px;
}

.hugvisindi-text-container {
  display: flex;
  flex-direction: column;
}



.hugvisindi-description-text {
  margin-top: auto;
  margin-bottom: auto;
}


.cat-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-image {
  height: 128px;
}

.hugvisindi-item-lower-row {
  display: grid;
}


@media (max-width: 768px) {
  .hugvisindi-links {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .hugvisindi-item-lower-row {
  display: grid;
  grid-template-columns: 1fr;
}

}
</style>
