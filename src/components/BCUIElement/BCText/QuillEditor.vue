<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
  // require sources
  import Quill from 'quill';
  import 'quill/dist/quill.core.css' // import styles
  import 'quill/dist/quill.snow.css' // for snow theme
  import 'quill/dist/quill.bubble.css'
  
  const defaultOptions = {
    theme: 'snow',
    boundary: document.body,
    modules: {
      toolbar: [
          { 'header': '1' },
          { 'header': '2' },
          'bold', 'italic', 
          // 'underline',
          // { 'list': 'ordered'}, 
          // { 'list': 'bullet' },
          'link'
      ],
    },
    placeholder: 'Insert text here ...',
    readOnly: false
  }
  
  export default {
    name: 'QuillEditor',
    data() {
      return {
        _options: {},
        _content: '',
        defaultOptions
      }
    },
    props: {
      content: String,
      value: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        required: false,
        default: () => ({})
      },
      globalOptions: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      this.quill = null
      delete this.quill
    },
    methods: {
      // Init Quill instance
      initialize() {
        if(this.placeholder && this.placeholder.length)
          defaultOptions.placeholder = this.placeholder;
          
        if (this.$el) {
          // Options
          this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)
          // Instance
          this.quill = new Quill(this.$refs.editor, this._options)
          
          this.quill.enable(false)
          // Set editor content
          if (this.value || this.content) {
            this.quill.pasteHTML(this.value || this.content)
          }
          // Disabled editor
          if (!this.disabled) {
            this.quill.enable(true)
          }
          // Mark model as touched if editor lost focus
          this.quill.on('selection-change', (range, ...params) => {
            if (!range)
              this.$emit('blur', this.quill);
            else
              this.$emit('focus', this.quill);

            this.$emit('selection-change', range);
          })
          // Update model if text changes
          this.quill.on('text-change', (delta, oldDelta, source) => {
            let html = this.$refs.editor.children[0].innerHTML
            const quill = this.quill
            const text = this.quill.getText()
            if (html === '<p><br></p>') html = ''
            this._content = html
            this.$emit('update:modelValue', this._content)
            this.$emit('change', { html, text, quill })
          })
          // Emit ready event
          this.$emit('ready', this.quill)
        }
      }
    },
    watch: {
      // Watch content change
      content(newVal, oldVal) {
        if (this.quill) {
          if (newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      // Watch content change
      value(newVal, oldVal) {
        if (this.quill) {
          if (newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      // Watch disabled change
      disabled(newVal, oldVal) {
        if (this.quill) {
          this.quill.enable(!newVal)
        }
      }
    }
  }
</script>