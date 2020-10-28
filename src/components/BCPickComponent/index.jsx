import { h } from 'vue';

export default {
    name: "BcPickComponent",
    render(){
        const uiElements = Object.values(_Articulate.uiElements);
        
        return (
            <div class={`BcPickComponent ${this.show ? 'open' : ''}`}>
                <button id="closer" onClick={this.cancel}>
                    <svg enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100"><polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2   51.5,51.1 79.6,23 "/></svg>            
                </button>

                <transition onBeforeEnter={this.beforeEnter} onEnter={this.enter} onLeave={this.leave} css={true}>
                    {
                        !this.show ? <div key="noPickComponents"></div>
                        : (        
                            <div key="pickComponents" id="bcEditor">
                                <div id="label">
                                    Pick Element
                                </div>
                                <div id="form" style="max-height: 400px; overflow: auto">
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.8rem; row-gap: 1.2rem">
                                        { 
                                            uiElements.map((el) => {
                                                const borderColor = '#eaeaea';
                                                let preview = el.preview();

                                                return (
                                                    <div onClick={() => this.submit(el)} class="layout vertical center" style="overflow: hidden; width: 100%; min-height: 100%">
                                                        <div className="self-stretch flex-1 layout center picker-preview blog-content" style={`margin-bottom: 0.3rem; border: 2px solid ${borderColor}; border-radius: 5px; overflow: hidden`}>
                                                            {  h( "div", { class:"flex-1", innerHTML: preview }) }
                                                        </div>
                                                        <strong>{el.label}</strong>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                
                                {/* <div id="buttons">
                                    <button onClick={() => this.cancel()}>Cancel</button>
                                    <button onClick={() => this.submit(element)}>Save</button>
                                </div> */}
                            </div>
                        )
                    }
                </transition>
            </div>
        );
    },
    methods: {
        cancel: function(){
            this.$emit('cancel');
        },
        submit: function(component){
            const options = {};
            for (const key in component.props) {
                const element = component.props[key];
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

        beforeEnter: function(el){
            el.style.left = this.positionStyle.left;
            el.style.top = this.positionStyle.top;
        },

        enter: function (el, done) {
            console.log("On enter: ", el, done);
            const slideIn = el.animate([
				{opacity: 0, transform: "translateX(-20%)"},
				{opacity: 1, transform: "none"}
            ], {duration: 100, easing: 'ease-out'});
            
            slideIn.onfinish = function(){
                done();
            };
        },

        leave: function (el, done) {
            const slideOut = el.animate([
                {transform: "none"},
				{transform: "translateX(-20%)"}
			], {duration: 100, easing: 'ease-in'});

            slideOut.onfinish = function(){
                done();
            };
        }
    },
    props: {
        show: Boolean
    },
    computed: {
        fields: function(){
            return 
        }
    }
}