'use strict';

// Lib(s)
import Highway from '@dogstudio/highway';
import gsap, { Quad } from 'gsap';

// Module(s)
import { preloadImages } from '../../modules/media';

// Classes(s)
class MrTransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);

    Promise.all([preloadImages()]).then(() => {
      const TIMELINE_IN = gsap.timeline({onComplete: done});
      let time = .25;

      from.remove();

      TIMELINE_IN.fromTo(to, {opacity: 0}, {duration: time * 1.25, delay: time,  opacity: 1});
      
      if (document.querySelector('[data-mr-el="hero-headline"]')) {
        TIMELINE_IN.fromTo('[data-mr-el="hero-headline"]', {opacity: 0, y: 20}, {duration: time * 1.75, opacity: 1, y: 0}, '<-.2');
      }
    });    
  }

  out({ from, done }) {
    const TIMELINE_OUT = gsap.timeline({onComplete: done});
    let time = .25;

    if (document.querySelector('[data-mr-el="hero-headline"]')) {
      TIMELINE_OUT.fromTo('[data-mr-el="hero-cta"]', {opacity: 1}, {opacity: 0, duration: time})
      .fromTo('[data-mr-el="hero-headline"]', {opacity: 1}, {opacity: 0, duration: time})
      .fromTo('[data-mr-el="project-copyblock"]', {opacity: 1}, {opacity: 0, duration: time})
      .fromTo('[data-mr-el="project-thumbnail-outerwrap"]', {opacity: 1, y: 0}, {opacity: 0, y: '-5vh', duration: time, stagger: .1, ease: Quad.easeIn})
      .fromTo(from, {opacity: 1}, {duration: time, opacity: 0});
    } else {
      TIMELINE_OUT.fromTo('[data-mr-el="project-detail-out"]', {opacity: .85, y: 0}, {opacity: 0, y: '-5vh', duration: time, stagger: .1, ease: Quad.easeIn})
      .fromTo(from, {opacity: 1}, {duration: time, opacity: 0});
    }
  }
}

export default MrTransition;