'use strict';

// Lib(s)
import gsap from 'gsap';

// Module(s)
import { isTouchEnabled } from '../modules/noJS';

// Util(s)
import { lerp } from '../utils/math';

// Prop(s)
const HAS_TOUCH = isTouchEnabled();

const SHROUD = document.querySelector('[data-mr-component="shroud"]');
const TIMELINE_SHROUD = gsap.timeline();
const LIGHT_SWITCH = document.querySelector('[data-mr-el="header-switch"]');
const LIGHT_SWITCH_LABEL = document.querySelector('[data-mr-el="switch-label"]');

const CANVAS = document.querySelector('[data-mr-component="canvas-spotlight"]');
const CTX = CANVAS.getContext('2d');
let w = CANVAS.width = window.innerWidth;
let h = CANVAS.height = window.innerHeight;

let offsetX; 
let offsetY;

let mouseX = 0;
let mouseY = 0;

let radius = 285;
let lerpDamp = 0.1;

// Method(s)
const reOffset = () => {
    let BB = CANVAS.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;

    w = CANVAS.width = window.innerWidth;
    h = CANVAS.height = window.innerHeight;
};

const draw = () => {
    CTX.save();
    CTX.clearRect(0, 0, w, h);

    let radialGradient = CTX.createRadialGradient(mouseX, mouseY, 1, mouseX, mouseY, radius);

    radialGradient.addColorStop(.1, 'rgba(255, 255, 255, .25');
    radialGradient.addColorStop(.2, 'rgba(0, 0, 0, .9');
    radialGradient.addColorStop(.7, 'rgba(255, 255, 255, .25');
    radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    CTX.beginPath();
    CTX.fillStyle = '#161616'; 
    CTX.fillRect(0, 0, w, h);
    CTX.globalCompositeOperation = 'destination-out';
    CTX.arc(mouseX, mouseY, radius, 0, Math.PI * 2, false);
    CTX.fillStyle = radialGradient;
    CTX.fill();
    CTX.restore();

    if (!HAS_TOUCH) {
        requestAnimationFrame(draw);
    }  
};

const mouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    mouseY = lerp(mouseY, parseInt(e.clientY - offsetY), lerpDamp);
    mouseX = lerp(mouseX, parseInt(e.clientX - offsetX), lerpDamp);
};

const lookFortheLight = (e) => {
    let className = 'look-for-the-light';
    
    TIMELINE_SHROUD.fromTo(SHROUD, {opacity: 0}, {opacity: 1, duration: .25, 
        onStart: () => {
            SHROUD.style.display = 'block';
        }, 
        onComplete: () => {
            if (CANVAS.classList.contains(className)) {
                CANVAS.classList.remove(className);
                LIGHT_SWITCH_LABEL.innerHTML = 'Lights On';
                return;
            }

            CANVAS.classList.add(className);
            LIGHT_SWITCH_LABEL.innerHTML = 'Lights Out';
    }})
    .fromTo(SHROUD, {opacity: 1}, {opacity: 0, duration: .25, onComplete: () => {
        SHROUD.style.display = 'none';
    }});
};

const bind = () => {
    LIGHT_SWITCH.addEventListener('click', lookFortheLight, false );
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('touchmove', mouseMove, false);
    window.addEventListener('resize', reOffset, false);
};

const init = () => {
    reOffset();
    bind();
    requestAnimationFrame(draw);
};

// Export(s)	
export {
	init
};
