<template>
    <div class="BcPickComponent" :class="{'open' : show}">
        <button id="closer" @click="cancel">
            <svg enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100"><polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2   51.5,51.1 79.6,23 "/></svg>
        </button>

        <transition @enter="enter" @leave="leave" :css="true">
            <div v-show="show" id="bcEditor">
                <div id="label">
                    Pick Element
                </div>
                <div id="form" style="max-height: 400px; overflow: auto">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.8rem; row-gap: 1.2rem">
                        <div v-for="(element, index) in elements" :key="index"
                            @click="addEl(element)" class="layout vertical center" style="overflow: hidden; width: 100%; min-height: 100%">
                            <div className="self-stretch flex-1 layout center picker-preview blog-content" 
                                style="margin-bottom: 0.3rem; border-radius: 5px; overflow: hidden; border: 2px solid #eaeaea"
                            >
                                <div class="flex-1" v-html="element.preview"></div>
                            </div>
                            <strong>{{element.label}}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BcPickComponent",
    props: {
        show: Boolean
    },
    mounted(){
        const uiElements = Object.values(_Articulate.uiElements);
        this.elements = uiElements.map(el => (
            {
                ...el, 
                preview: el.preview(), 
                name: el.name
            }
        ));
    },
    data(){
        return {
            elements: []
        }
    },
    methods: {
        cancel: function(){
            this.$emit('cancel');
        },
        addEl: function(component){
            const options = {};
            for (const key in component.skeleton) {
                const element = component.skeleton[key];
                options[key] = element.default;
            }

            const el = {
                id: (Math.random() * 1e32).toString(36), // randomId
                name: component.label,
                component: component.name,
                options
            };

            this.$emit('add', el);
        },

        enter: function (el, done) {
            const slideIn = el.animate([
				{opacity: 0, transform: "translateY(20%)"},
				{opacity: 1, transform: "none"}
            ], {duration: 150, easing: 'ease-out'});
            
            slideIn.onfinish = function(){
                done();
            };
        },

        leave: function (el, done) {
            const slideOut = el.animate([
                {transform: "none"},
				{transform: "translateY(20%)"}
			], {duration: 100, easing: 'ease-in'});

            slideOut.onfinish = function(){
                done();
            };
        }
    }
}
</script>