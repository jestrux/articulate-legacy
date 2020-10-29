<style>

</style>

<template>
  <bc-editor
    :editting="editting"
    :element="curelement"
    @save="saveElement"
    @cancel="cancelEditting"
  />
  
  <BcPickComponent 
    :show="showPicker" 
    @add="addElement"
    @cancel="showPicker = false"
  />

  <template v-for="(element, index) in elements" :key="index">
    <bc-ui-element
      :element="element"
      @editElement="editElement($event)"
      @removeElement="removeElement($event)"
    />
  </template>
</template>

<script>

import axios from "axios";
// import {debounce} from "lodash";
import BcPickComponent from "./components/BcPickComponent/index.vue";
import BCUIElement from "./components/BCUIElement/index.jsx";
import BCEditor from "./components/BCEditor/index.vue";

export default {
  inject: ['Articulate'],
  data() {
    return {
      blogId: null,
      entry_idx: -1,
      html_text: "",
      elements: [
        
      ],
      editting: false,
      curelement: {},
      showPicker: false,
      saving: true,
      saving_result: {}
    };
  },

  methods: {
    addItem(target, element) {
      this.showPicker = true;
    },

    addElement(el) {
      this.showPicker = false;

      if (!el.label || !el.label.length) {
        const len = this.elements.filter(({name}) => name === el.name);
        el.label = el.name + " " + len;
      }
      
      return this.editElement(el);
    },

    editElement: function(el) {
      this.curelement = el;
      this.editting = true;
    },

    removeElement: function(elementId) {
      var idx = this.elements.findIndex(({id}) => id === elementId);
      this.elements.splice(idx, 1);
      this.autosave();
    },

    saveElement: function(e) {
      this.editting = false;

      if (!e) return;

      var idx = this.elements.findIndex(({id}) => id === e.id);

      if (idx != -1) {
        this.elements = this.elements.map((elem, index) => {
          if (index === idx) {
            return {
              ...e,
              id: (Math.random() * 1e32).toString(36)
            };
          }
          
          return elem;
        });
      } 
      else {
        const newRandomId = (Math.random() * 1e32).toString(36);
        e.id = newRandomId;
        this.elements.push(e);
        return newRandomId;
      }
      this.curelement = {};
      this.editting = false;
    },

    cancelEditting: function() {
      this.curelement = {};
      this.editting = false;
    },

    autosave(){
      this.publish();
    },

    // autosave: debounce(function() {
    //   this.publish();
    // }, 2000),
    
    setHtml: function() {
      const html = this.elements.reduce((html_string, el) => {
          html_string + el.options.html;
        },
        ""
      );
      
      this.html_text = html;
    },

    publish: function(with_date) {
      this.saving_result = {};
      this.setHtml();
      const creator_json = { elements: this.elements };

      let data = {
        html: this.html_text,
        json: JSON.stringify(creator_json)
      };

      if (this.blogId) data.id = this.blogId;
      
      this.saving = true;
      this.saving_result = { message: "Saving..." };

      axios.post(this.saveUrl, data).then(
        response => {
          const res = response.data;
          this.saving = false;
          this.saving_result = { success: res.status };

          if (!res.status)
            this.saving_result.message = res.message || "Failed to saved changes!";

          setTimeout(() => this.saving_result = {}, 1000);
          console.log("Saved", res);
          if (res.new_id) 
            this.blogId = res.new_id;
          if (res.redirect_url)
            history.pushState({}, "editting", res.redirect_url);
        },
        error => {
          this.saving = false;
          this.saving_result = {
            success: false,
            message: "Failed to save, please check your network."
          };
          console.log("Save error", error);
        }
      );
    }
  },

  watch: {
    elements: {
      deep: true,
      handler: function(new_elements) {
        this.setHtml();
        this.autosave();

        this.$nextTick(() => {
          if(this.Articulate.options.onChange)
            this.Articulate.options.onChange(this.html_text, this.elements);
        });
      }
    }
  },

  components: {
    "bc-editor": BCEditor,
    "bc-ui-element": BCUIElement,
    BcPickComponent
  }
};
</script>