import { createApp } from 'vue';
import App from "./App.vue";
import LeanApp from "./LeanApp.vue";
import './index.css';

function Articulate(containerId, options = {}){
    this.options = options;
    initArticulate(containerId, this);
}

window.Articulate = Articulate;

async function initArticulate(containerId, _articulate){
    if(!_articulate.options.lean){
        const UIELements = await import("./UIElements");
        _articulate.uiElements = { ...UIELements };
        const app = createApp(App);
        app.provide('Articulate', _articulate);
        app.mount(containerId)
    }
    else{
        _articulate.uiElements = {..._articulate.options.uiElements};
        const app = createApp(LeanApp);
        app.provide('Articulate', _articulate);
        const vm = app.mount(containerId);
        _articulate.add = () => vm.addItem();
    }
}
