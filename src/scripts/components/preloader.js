'use strict';

// Lib(s)
import gsap, { Quad } from 'gsap';

// Prop(s)
const HTML = document.querySelector('html');
const MAIN = HTML.querySelector('#main');
const PRELOADER = HTML.querySelector('[data-mr-component="screen-preload"]');
const QUOTE_WRAPPER = PRELOADER.querySelector('[data-mr-el="quote-wrapper"]');
const QUOTE_SPAN = QUOTE_WRAPPER.querySelectorAll('.q-span');
const QUOTE_BYLINE = PRELOADER.querySelector('[data-mr-el="quote-byline"]');
const TL = gsap.timeline();

// Method(s)
const hide = () => {
	PRELOADER.style.display = 'none';
	HTML.classList.remove('overflow-hide');
};

const show = () => {
	PRELOADER.style.display = 'block';
	HTML.classList.add('overflow-hide');
};

const load = () => {
	TL.fromTo(QUOTE_SPAN, {opacity: 0}, {opacity: 1, duration: 1.95, ease: Quad.easeOut, stagger: .125, onStart: show})
	  .fromTo(QUOTE_BYLINE, {opacity: 0}, {opacity: 1, duration: .35, ease: Quad.easeIn})
	  .fromTo(QUOTE_WRAPPER, {opacity: 1}, {opacity: 0, delay: 3, duration: .35, ease: Quad.easeIn})
	  .fromTo(PRELOADER, {y: 0}, {y: '-100vh', delay: .5, duration: .4, ease: Quad.easeIn, onComplete: hide})
	  .fromTo(MAIN, {scale: .95, opacity: 0, y: '5vh'}, {opacity: 1, scale: 1,  y: 0, duration: .65, ease: Quad.easeOut}, '<-.04');
};

const init = () => {
	if (PRELOADER.classList.contains('debug')) {
		return;
	}
	
	setTimeout(load, 1000);
};

// Export(s)	
export {
	init
};
