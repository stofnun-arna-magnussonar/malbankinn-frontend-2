<template>
  <div class="about">
    <h1 class="secondary-header" v-html="$translate('submissionsTitle')"></h1>
    <div class="about-text-container">
      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsTheRepositoryTitle')"></p>
        </div>
        <div class="about-text">
          <p v-html="$translate('submissionsTheRepositoryContent')">
            
          </p>
        </div>
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsWhatCanISubmitTitle')"></p>
        </div>
        <div class="about-text">
          <p v-html="$translate('submissionsWhatCanISubmitContent')">
          </p>
        </div>
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsWhyShouldISubmitTitle')"></p>
        </div>
        <div class="about-text" v-html="$translate('submissionsWhyShouldISubmitContent')">

        </div>
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsHowDoIGainAccessTitle')"></p>
        </div>
        <div class="about-text">
          <p v-html="$translate('submissionsHowDoIGainAccessContent')">
            
          </p>
        </div>
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsCanAnyoneSubmitTitle')"></p>
        </div>
        <div class="about-text">
          <p v-html="$translate('submissionsCanAnyoneSubmitContent')">
            
          </p>
        </div>
      </div>
      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsHowDoISubmitTitle')"></p>
        </div>
        <div class="about-text" v-html="$translate('submissionsHowDoISubmitContent')">

        </div>
      </div>
      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsDataFormatTitle')"></p>
        </div>
        <div class="about-text">
          <p v-html="$translate('submissionsDataFormatContent')">
            
          </p>
        </div>
      </div>
      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle" v-html="$translate('submissionsLifecycleTitle')"></p>
        </div>
        <div class="about-text" v-html="$translate('submissionsLifecycleContent')">
          
        </div>
      </div>
    </div>
  </div>
  <Modal :modal-data-prop="modalData" :modalIsOpenProp="modalIsOpen" @close-modal="modalIsOpen = false" />
</template>

<script>
import concepts from "@/data/concepts.json";
import Modal from "@/components/Modal.vue";
export default {
  name: "Submit",
  components: { Modal },
  data() {
    return {
      concepts: concepts,
      modalIsOpen: false,
      modalData: null,
    };
  },
  methods: {
    setModalData(id) {
      this.modalIsOpen = true;
      this.modalData = concepts[id];
    },
  },
};
</script>
<style scoped></style>
