<style scoped>
    #editorWrapper:not(.inline){
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        pointer-events: none;
    }

    #editorWrapper.open{
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.975);
    }

    #editorWrapper.on-the-side.open{
        background: rgba(255, 255, 255, 0.5);
    }

    #closer{
        position: absolute;
        top: 2em;
        right: 2em;
        border: none;
        background: transparent;
    }

    #editorWrapper.on-the-side #closer{
        padding: 0;
        min-width: 0;
        width: 36px;
        height: 36px;
        top: 8px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #editorWrapper.on-the-side #closer svg{
        width: 24px;
    }

    #editorWrapper.inline #closer{
        display: none;
    }

    #label{
        font-size: 1.1em;
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
    }

    #editorWrapper:not(.inline) #bcEditor{
        width: 500px;
    }

    #bcEditor{
        background: #fff;
        box-shadow: 0 1px 8px 0.5px rgba(0, 0, 0, 0.2);
    }

    #editorWrapper.on-the-side #bcEditor{
        box-shadow: -3px 1px 20px rgba(0, 0, 0, 0.2);
        height: 100vh;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        width: 400px;
    }

    #bcEditor.text-only{
        border: none;
    }

    #label, #buttons{
        display: flex;
        align-items: center;
        background: #eee;
        padding: 0.8em 1em;
    }

    #buttons{
        border-top: 1px solid #eee;
        background: #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    #bcEditor.text-only{
        border-top: none;
    }

    #form{
        padding: 1em;
        overflow-y: auto;
    }

    #editorWrapper:not(.on-the-side) #form{
        max-height: 400px;
    }

    #editorWrapper.on-the-side #form{
        flex: 1;
        max-height: auto;
    }

    #bcEditor.text-only #form{
        padding: 0;
    }

    .editor-item + .editor-item{
        margin-top: 0.8em;
    }

    button{
        border: 1px solid #000;
        background: #333;
        color: #fff;
        font-size: 0.85em;
        padding: 0.31em 1.5em;
        border-radius: 5px;
        min-width: 90px;
        text-transform: uppercase;
    }

    button:first-child{
        background: transparent;
        color: #555;
        border-color: #999;
        margin-right: 0.5em;
    }
</style>

<template>
    <div id="editorWrapper" :class="{
        'open' : editting, 'inline': inline,
        'on-the-side': onTheSide
    }">
        <button v-if="editting" id="closer" @click="cancelEditting(element.id)">
            <svg enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100" xml:space="preserve"><polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2   51.5,51.1 79.6,23 "/></svg>
        </button>

        <transition @enter="enter" @leave="leave" :css="true">
            <div id="bcEditor" v-show="editting" :class="{'text-only': element ? element.component === 'bc-text' : ''}">
                <input id="label" v-model="element.label" />
                
                <div id="form">
                    <div class="editor-item" v-for="(field, index) in fields" 
                        :key="index">

                        <bc-editor-field
                            :modelValue="field"
                            @update:modelValue="field = $event"
                        />

                    </div>
                </div>

                <div id="buttons">
                    <button @click="cancelEditting()">Cancel</button>
                    <button @click="saveElement(element)">Save</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import BCEditorField from './BCEditorField/index.vue';

export default {
    name: "BcEditor",
    methods: {
        cancelEditting: function(){
            this.$emit('cancel');
        },
        enter: function (el, done) {
            const slideIn = el.animate([
				{opacity: 0, transform: "translateX(100%)"},
				{opacity: 1, transform: "none"}
            ], {duration: 150, easing: 'ease-out'});
            
            slideIn.onfinish = function(){
                done();
            };
        },

        leave: function (el, done) {
            const slideOut = el.animate([
                {transform: "none"},
				{transform: "translateX(100%)"}
			], {duration: 80, easing: 'ease-in'});

            slideOut.onfinish = function(){
                done();
            };
        },
        saveElement: function(element){
            const options = {};
            this.fields.forEach((field, index) => {
                options[field.name] = field.value;
            });
            
            element.options = options;

            this.$emit('save', element);
        }
    },
    props: {
        element: Object,
        editting: Boolean,
        inline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        onTheSide: function(){
            if(_Articulate && _Articulate.options && _Articulate.options.editOnFocus)
                return true;

            return false;
        },
        fields: function(){
            if(!this.element || !this.element.component)
                return [];

            const component = _Articulate.uiElements[this.element.component];

            if(!component)
                return [];

            const fields = [];

            for (const key in component.props) {
                const {type, defaultValue, choices} = component.props[key];
                const field = {type, defaultValue, choices};

                if(type.indexOf('text') == -1 && !this.element.options[key] && defaultValue !== null)
                    field.value = defaultValue;
                else if(this.element.options[key])
                    field.value = this.element.options[key];

                field.name = key;
                fields.push(field);
            }

            return fields;
        }
    },
    components: {
      'bc-editor-field': BCEditorField
    }
}
</script>