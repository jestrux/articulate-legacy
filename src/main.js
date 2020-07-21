import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

function Articulate(containerId){
    createApp(App).mount(containerId);
}

window.Articulate = Articulate;
