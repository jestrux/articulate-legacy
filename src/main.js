import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import BcImage from './UIElements/BcImage';
import BcAlert from './UIElements/BcAlert';
import BcQuote from './UIElements/BcQuote';
import BcYoutube from './UIElements/BcYoutube';
import BcCode from './UIElements/BcCode';

function Articulate(containerId, options){
    this.uiElements = {
        BcImage,
        BcAlert,
        BcQuote,
        BcYoutube,
        BcCode
    }
    this.options = options;

    window._Articulate = this;

    createApp(App).mount(containerId);
}

window.Articulate = Articulate;
