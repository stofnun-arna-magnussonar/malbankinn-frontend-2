<template>
  <div ref="singleitemcontainer">
    <div v-html="htmlContent"></div>
  </div>
  <Modal :modalDataProp="activeBibText" :modalIsOpenProp="modalIsOpen"
    @close-modal="modalIsOpen = false; activeBibText = null" :is-bib-modal="true" />
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  name: 'SingleItem',
  props: {
    itemProp: {
      type: String,
      required: true
    },
    activeLanguageProp: {
      type: String,
      required: true
    },
  },
  components: {
    Modal
  },
  data() {
    return {
      item: this.itemProp,
      htmlContent: '',
      activeBibEntry: null,
      activeBibText: null,
      modalIsOpen: false
    }
  },
  computed: {
    activeLanguage() {
      return this.activeLanguageProp
    }
  },
  methods: {
    async loadHtmlContent() {
      const response = await fetch(`/html/${this.activeLanguageProp}/${this.item}.html`);
      this.htmlContent = await response.text();

      const container = this.$refs.singleitemcontainer;
      let shadowRoot = container.shadowRoot;

      if (!shadowRoot) {
        shadowRoot = container.attachShadow({ mode: 'open' });
      } else {
        shadowRoot.innerHTML = '';
      }

      const wrapper = document.createElement('div');
      wrapper.innerHTML = this.htmlContent;

      this.removeDuplicateBreaks(wrapper);

      const bibLinks = wrapper.querySelectorAll('a[href$=".bib"]');
      bibLinks.forEach(link => {
        link.removeAttribute('target');
        link.style.cursor = 'pointer';

        link.addEventListener('click', async (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          const bibUrl = `/bib/${href.split('/').pop()}`;

          try {
            const bibResponse = await fetch(bibUrl);
            const bibText = await bibResponse.text();
            const bibJson = this.parseBibTeX(bibText);
            this.showBibModal(bibJson, bibText);
          } catch (err) {
            console.error('Failed to load .bib file:', err);
          }
        });
      });

      shadowRoot.appendChild(wrapper);

      const style = document.createElement('style');
      style.textContent = `
            .intro, p { font-weight: 200; font-family: RecklessRegular; }
            .intro > strong { font-weight: 200 }
            h1, h2, h3, h4, h5, p, strong { margin: 0px; }
            h1 { font-size: 48px; line-height: 110%; }
            h2 { font-size: 36px; line-height: 135%; }
            h3 { font-size: 20px; line-height: 135%; }
            a { color: var(--primary-green); font-family: 'RecklessMediumItalic'; line-height: 160%; }
            td > a { font-family: 'RecklessMedium' }
            p { margin-bottom: 10px; margin-top: 10px; }
            strong { font-weight: 400 }
            h1, h2, h3 { font-weight: 400; margin-top: 20px; font-family: RecklessRegular; }
            td, th { padding: 10px 20px; }
            table { border-collapse: collapse; font-family: RecklessRegular; }
            .table-bordered { border: 1px solid var(--primary-green); }
            .table thead th { vertical-align: bottom; }
            th { text-align: start; }
            .table-bordered td, .table-bordered th { border: 1px solid var(--primary-green); }
            li, .heimildir_texti { font-family: RecklessRegular; }
            a { color: var(--primary-blue); }
            body { font-family: RecklessRegular; }
            :host { font-family: RecklessRegular; }
            tr { border-bottom: 1px solid var(--primary-green); }
            .table-container { overflow-x: auto; -webkit-overflow-scrolling: touch; }
            .table-container > table { width: max-content; border-collapse: collapse; }
            .badge-secondary { background-color: var(--secondary-green); border-radius: 5px; text-decoration: none; padding: 5px 10px; font-family: 'RecklessMedium' }
            .badge-secondary:hover { outline: 1px solid var(--primary-green); }
            .cite { display: flex; gap: 8px; }
          `;
      shadowRoot.appendChild(style);

      this.checkForHashInUrl();
    },
    scrollToDownload(hash) {
      const shadowRoot = this.$refs.singleitemcontainer.shadowRoot;
      if (!shadowRoot) {
        return;
      }
      const downloadElement = shadowRoot.querySelector(hash);

      if (downloadElement) {
        downloadElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
    checkForHashInUrl() {
      const hash = window.location.hash;
      if (['#download', '#Versions', "#Licencing"].includes(hash)) {
        console.log(hash)
        this.scrollToDownload(hash);
      }
    },
    removeDuplicateBreaks(wrapper) {
      const walker = document.createTreeWalker(wrapper, NodeFilter.SHOW_ELEMENT, null, false);
      const brsToRemove = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeName === 'BR') {
          let prev = node.previousSibling;
          while (prev && prev.nodeType === 3 && !prev.textContent.trim()) {
            prev = prev.previousSibling;
          }

          if (prev && prev.nodeName === 'BR') {
            brsToRemove.push(node);
          }
        }
      }
      brsToRemove.forEach((br) => br.remove());
    },
    parseBibTeX(bibText) {
      const entries = [];
      const entryRegex = /@(\w+)\s*{\s*([^,]+),([\s\S]*?)}/g;

      let match;
      while ((match = entryRegex.exec(bibText)) !== null) {
        const [, type, key, content] = match;
        const fields = {};
        content.split('\n').forEach(line => {
          const fieldMatch = line.match(/^\s*(\w+)\s*=\s*[{"](.+?)[}"],?\s*$/);
          if (fieldMatch) {
            const [, field, value] = fieldMatch;
            fields[field.trim()] = value.trim();
          }
        });

        entries.push({ type, key, fields });
      }

      return entries;
    },
    showBibModal(bibJson, bibRaw) {
      this.activeBibEntry = bibJson;
      this.activeBibText = bibRaw;
      this.modalIsOpen = true;
    }

  },
  async mounted() {
    this.loadHtmlContent();
    this.checkForHashInUrl();
    window.addEventListener('hashchange', this.checkForHashInUrl);
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.checkForHashInUrl);
  },
  watch: {
    activeLanguageProp() {
      this.loadHtmlContent();
    },
    item() {
      this.loadHtmlContent();
    }
  }

}
</script>
