import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

function Articulate(containerId, options){
    createApp(App).mount(containerId);
    window.ArticulateOptions = options;
}

window.Articulate = Articulate;
