'use strict';

// Lib(s)
import Highway from '@dogstudio/highway';
import LocomotiveScroll from 'locomotive-scroll';

// Module(s)
import { isTouchEnabled } from '../../modules/noJS';

// Util(s)
import { clamp, map } from '../../utils/math';

// Classes(s)
class MrRenderer extends Highway.Renderer {
  onEnter() {}

  onLeave() {}

  // onEnterCompleted() {
  //   const HAS_TOUCH = isTouchEnabled();
  //   const HERO_CTA = document.querySelector('[data-mr-el="hero-cta"]');
  //   const ALL_IMAGES = [...document.querySelectorAll('[data-scroll-fx="distort"]')];
    
  //   let scroll = {cache: 0, current: 0};
    
  //   this.loco = new LocomotiveScroll({
  //     el: document.querySelector('[data-scroll-container]'),
  //     smooth: true,
  //     tablet: {
  //       smooth: (HAS_TOUCH) ? false : true
  //     },
  //     smartphone: {
  //       smooth: (HAS_TOUCH) ? false : true
  //     }
  //   });
   
  //   if (HERO_CTA) {
  //     let that = this.loco;
      
  //     HERO_CTA.addEventListener('click', function(e){
  //         e.preventDefault();
  //         let deepLinkEl = document.querySelector(this.dataset.href);
  //         that.scrollTo(deepLinkEl);
  //     }, false);  
  //   }
    
  //   if (ALL_IMAGES.length > 0 && !HAS_TOUCH) {
  //     this.loco.on('scroll', (obj) => {
  //         scroll.current = obj.scroll.y;
          
  //         const DISTANCE = scroll.current - scroll.cache;
  //         scroll.cache = scroll.current;
          
  //         const SKEW_VAL = map(DISTANCE, -40, 40, -10, 10);
  //         ALL_IMAGES.forEach(el => el.style.transform = 'skewY('+clamp(SKEW_VAL, -10, 10)+ 'deg)');
  //     });
  //   }
    
  //   this.loco.update();  
  // }

  // onLeaveCompleted() {
  //   this.loco.destroy();
  // }
}

export default MrRenderer;