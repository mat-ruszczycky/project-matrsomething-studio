'use strict';

// Module(s)
import * as NoJs from './modules/noJS';

// Component(s)
import * as Canvas from './components/canvas';
import * as Preloader from './components/preloader';
import * as TransitionManager from './components/transitionManager';

// Main
const Main = () => {
    NoJs.init();
    Preloader.init();
    Canvas.init();
    TransitionManager.init();
};

document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete') {
        Main();
    }
});