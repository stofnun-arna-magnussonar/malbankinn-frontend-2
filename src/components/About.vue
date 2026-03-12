<template>
  <div ref="about" class="about">
    <h1 class="main-header" v-html="$translate('malbankinnTitle')"></h1>
    <div class="about-text-container">

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle">{{ $translate('aboutWhatIsMalbankinnTitle') }}</p>
        </div>
          <p class="about-text">
            <span v-html="$translate('aboutWhatIsMalbankinnContent')"></span>
          </p>
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle">{{ $translate('aboutWhatIsInMalbankinnTitle') }}</p>

        </div>
        <p class="about-text">
          <span v-html="$translate('aboutWhatIsInMalbankinnContent')"></span>
        </p>
        
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle">{{ $translate('aboutWhoCanUseTitle') }}</p>

        </div>
          <p class="about-text">
            <span v-html="$translate('aboutWhoCanUseContent')"></span>
          </p>
        
      </div>

      <div class="about-subcontainer">
        <div class="about-subtitle-container">
          <p class="about-subtitle">{{ $translate('aboutClarinTitle') }}</p>

        </div>
          <p class="about-text">
            <span v-html="$translate('aboutClarinContent')"></span>
          </p>
        
      </div>
      <p class="contact"><a href="mailto:malbankinn@arnastofnun.is" v-html="$translate('contact')"></a></p>



      
    </div>
    <!--
    <div class="starfsfolk-container">
      <h1 class="about-title" v-html="$translate('aboutStaffMembers')"></h1>
      
      <div class="starfsfolks">

        <div class="starfsfolk">
          <img class="starfsfolk-img" src="/media/starfsfolk/starfsfolk_myndir_Atli.jpg"/>
          <a class="regular-text starfsfolk-name" href="mailto:&#097;&#116;&#108;&#105;&#046;&#106;&#097;&#115;&#111;&#110;&#097;&#114;&#115;&#111;&#110;&#064;&#097;&#114;&#110;&#097;&#115;&#116;&#111;&#102;&#110;&#117;&#110;&#046;&#105;&#115;">Atli Jasonarson</a>
          <p class="starfsfolk-title" v-html="$translate('aboutWebmaster')"></p>
        </div>
        
        <div class="starfsfolk">
          <img class="starfsfolk-img" src="/media/starfsfolk/starfsfolk_myndir_Samúel.jpg"/>
          <a class="regular-text starfsfolk-name" href="mailto:&#115;&#097;&#109;&#117;&#101;&#108;&#046;&#116;&#104;&#111;&#114;&#105;&#115;&#115;&#111;&#110;&#064;&#097;&#114;&#110;&#097;&#115;&#116;&#111;&#102;&#110;&#117;&#110;&#046;&#105;&#115;">Samúel Þórisson</a>
          <p class="starfsfolk-title" v-html="$translate('aboutDataMaster')"></p>
        </div>
        
        <div class="starfsfolk">
          <img class="starfsfolk-img" src="/media/starfsfolk/starfsfolk_myndir_Starkaður.jpg"/>
          <a class="regular-text starfsfolk-name" href="mailto:&#115;&#116;&#097;&#114;&#107;&#097;&#100;&#117;&#114;&#046;&#098;&#097;&#114;&#107;&#097;&#114;&#115;&#111;&#110;&#064;&#097;&#114;&#110;&#097;&#115;&#116;&#111;&#102;&#110;&#117;&#110;&#046;&#105;&#115;">Starkaður Barkarson</a>
          <p class="starfsfolk-title" v-html="$translate('aboutNationalCoordinator')"></p>
        </div>
        
        <div class="starfsfolk">
          <img class="starfsfolk-img" src="/media/starfsfolk/starfsfolk_myndir_Steinþór.jpg"/>
          <a class="regular-text starfsfolk-name" href="mailto:&#115;&#116;&#101;&#105;&#110;&#116;&#104;&#111;&#114;&#046;&#115;&#116;&#101;&#105;&#110;&#103;&#114;&#105;&#109;&#115;&#115;&#111;&#110;&#064;&#097;&#114;&#110;&#097;&#115;&#116;&#111;&#102;&#110;&#117;&#110;&#046;&#105;&#115;">Steinþór Steingrímsson</a>
          <p class="starfsfolk-title" v-html="$translate('aboutOperationsManager')"></p>
        </div>
      </div>

    </div>-->
  </div>
  <Modal :modal-data-prop="modalData" :modalIsOpenProp="modalIsOpen" @close-modal="modalIsOpen=false"/>
</template>

<script>
import concepts from '@/data/concepts.json';
import Modal from '@/components/Modal.vue';
import attachClickHandlers from '@/helperFunctions/clickableWords.js';
export default {
  name: 'About',
  components: { Modal },
  data() {
    return {
      concepts: concepts,
      modalIsOpen: false,
      modalData: null
    }
  },
  mounted() {
    this.$nextTick(this.attachClickHandlers(this.$refs.about, this.handleWordClick));
  },
  updated() {
    this.$nextTick(this.attachClickHandlers(this.$refs.about, this.handleWordClick));
  },
  methods: {
    attachClickHandlers: attachClickHandlers,
    handleWordClick(event) {
      const keyword = event.target.dataset.key
      this.setModalData(keyword);
    },
    setModalData(id) {
      this.modalIsOpen = true
      this.modalData = concepts[id]
    },
  }
}

</script>

<style scoped>

.about-title {
  font-size: 48px;
}

.about-image {
  max-height: 100%;
}

.starfsfolk-container {
  margin-top: 60px;
}

.starfsfolks {
  display: flex;
  gap: 40px;
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  flex-wrap: wrap;
}

.starfsfolk-img {
  align-self: left;
}

.starfsfolk {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

}

.starfsfolk-img {
  height: 100px;
  width: auto;
  border-radius: 5px;
}

.starfsfolk-name {
  font-family: 'RecklessMedium';
}

.contact {
  margin-left: auto;
}


</style>