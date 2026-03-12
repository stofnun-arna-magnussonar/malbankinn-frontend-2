<template>
  <Teleport to="body">
    <div v-if="modalIsOpenProp" class="modal centered-modal" @click.self="emitCloseModal">
      <div v-if="!isBibModal" class="modal-content-container">
        <div class="modal-top-row">
          <div v-if="conceptHistory.length > 0" @click="goBack" class="modal-back-button modal-button">
            ↵
          </div>
          <button @click="emitCloseModal" class="modal-close-button modal-button">
            <img class="close-symbol" src="/symbols/close-symbol.svg" />
          </button>
        </div>
        <div class="modal-content">
          <p class="category-name" v-html="modalData.title[activeLanguage]"></p>
          <p ref="categoryDescription" class="modal-description" v-if="modalData.description"
            v-html="modalData.description[activeLanguage]"></p>
        </div>
      </div>

      <div v-else class="modal-content-container">
        <div class="modal-description">
          <pre><code>{{ modalDataProp }}</code></pre>
        </div>
        <div class="modal-bottom-row">
          <button class="copy-button" :class="{'copied-button': justCopied}" @click="copyToClipboard"
            v-html="! justCopied ? $translate('modalCopy') : $translate('modalCopied')"></button>
        </div>
      </div>

    </div>
  </Teleport>
</template>

<script>
import concepts from '@/data/concepts.json';
import attachClickHandlers from '@/helperFunctions/clickableWords.js';
import { useGlobalConfigStore } from "@/stores/globalConfig";
export default {
  name: 'Modal',
  props: {
    modalIsOpenProp: Boolean,
    modalDataProp: [Object, String],
    isBibModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      concepts: concepts,
      userSetConcept: null,
      conceptHistory: [],
      globalConfigStore: useGlobalConfigStore(),
      justCopied: false
    }
  },
  mounted() {
    this.$nextTick(this.attachClickHandlers(this.$refs.categoryDescription, this.handleWordClick));
  },
  emits: ['close-modal'],
  methods: {
    attachClickHandlers: attachClickHandlers,
    emitCloseModal() {
      this.userSetConcept = null
      this.conceptHistory = []
      this.$emit('close-modal');
    },
    handleWordClick(event) {
      const keyword = event.target.dataset.key
      this.setModalData(keyword);
    },
    setModalData(data) {
      this.conceptHistory.push(this.modalData)
      this.userSetConcept = this.concepts[data]
    },
    goBack() {
      this.userSetConcept = this.conceptHistory.pop()
    },
    async copyToClipboard() {
      await navigator.clipboard.writeText(this.activeBibText);
      this.justCopied = true;
      setTimeout(() => {
        this.justCopied = false;
      }, 1500);
    }
  },
  computed: {
    modalData() {
      if (!this.userSetConcept) {
        return this.modalDataProp
      }
      return this.userSetConcept
    },
    activeLanguage() {
      return this.globalConfigStore.activeLanguage
    }
  },
  watch: {
    concepts: {
      handler() {
        this.$nextTick(this.attachClickHandlers(this.$refs.categoryDescription, this.handleWordClick));
      },
      deep: true,
    },

  },
  updated() {
    this.$nextTick(() => {
      this.attachClickHandlers(this.$refs.categoryDescription, this.handleWordClick);
    });
  }
};
</script>

<style scoped>
.modal {
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-modal {
  position: fixed;
  top: 0;
  left: 0;
}

.modal-content-container {
  margin: auto;
  display: flex;
  height: 500px;
  width: 500px;
  flex-direction: column;
  background-color: white;
  padding: 24px 24px 32px 24px;
  border-radius: 5px;
  box-shadow: 0px 8px 8px 4px #0000001F;
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.category-name {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-family: 'RecklessMedium';
}

.modal-description {
  max-height: 100%;
  overflow: auto;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.modal-description> :last-child {
  margin-bottom: 20px;
}

.modal-top-row {
  display: flex;
  margin-bottom: 10px;
}

.modal-button {
  height: 24px;
  width: 24px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.modal-close-button {
  margin-left: auto;
  color: white;
  background-color: #963939;
  padding: 8px;
}

.modal-back-button {
  color: white;
  background-color: var(--primary-blue);
}

.close-symbol {
  height: 16px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg) brightness(101%) contrast(105%);
}

.modal-bottom-row {
  display: flex;
}

.copy-button {
  background-color: var(--secondary-green);
  color: var(--primary-green);
  margin-left: auto;
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 120px;
}

.copied-button {
  background-color: var(--sky-blue);
}

.copy-button:hover {
  outline: 1px solid var(--primary-green);
}

pre {
  font-family: monospace;
  background: #f7f7f7;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
}

</style>