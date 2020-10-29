import { h } from 'vue';

export default {
    props:{
        element: Object
    },

    inject: ['Articulate'],

    render(){
        const { element, $emit, Articulate } = this;
        const { id, component, options } = element;

        const uiComponentClass = Articulate.uiElements[component];
        const uiComponent = new uiComponentClass(options);
        const editOnFocus = Articulate.options.editOnFocus;

        function renderActionButtons(){
            let className = "component-editor-buttons"; 
            className += component === 'bc-separator' ? 'delete-only' : '';
        
            return (
                <div class={className}>
                    <button class="component-editor-button"
                        onClick={() => $emit('editElement', element)}>
                        <svg fill="#f18f16" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </button>
                    <button class="component-editor-button"
                        onClick={() => $emit('removeElement', id)}>
                        <svg fill="#e04b2a" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </button>
                </div>
            );
        }
        
        function renderBasicElement(){
            let baseClass = 'blogpost-section-wrapper';
            if((component === 'bc-image' || component === 'bc-youtube-video') && options){
                if(options.width === 'wide')
                    baseClass += ' wide-image';
                else if(options.width === 'full')
                    baseClass += ' full-image';
            }
        
            return (
                <div class={baseClass}>
                    <div class="component-wrapper" style="position: relative;">
                        { renderActionButtons() }
        
                        {  h( "div", { 
                            innerHTML: uiComponent.render(),
                            onClick: editOnFocus ? () => $emit('editElement', element) : null
                        }) }
                    </div>
                </div>
            );
        }

        function renderLeanElement(){
            if(editOnFocus){
                return (
                    h( "div", { 
                        innerHTML: uiComponent.render(),
                        class: Articulate.options.className,
                        onClick: editOnFocus ? () => $emit('editElement', element) : null
                    })
                );
            }
        
            return (
                <div style="position: relative;">
                    { renderActionButtons() }
                    {  h( "div", { 
                            class: Articulate.options.className,
                            innerHTML: uiComponent.render() 
                        }) 
                    }
                </div>
            );
        }

        if(!Articulate.options.lean)
            return renderBasicElement(element, $emit);
        else
            return renderLeanElement(element, $emit);
            
    },

    data: function(){
        return{
            component: null,
            options: {}
        }
    },

    watch: {
        element:{
            immediate: true,
            deep: true,
            handler: function(newValue){
                this.component = newValue.component;
                this.options = newValue.options;
            }
        }
    }
}