'use strict';

// Libs(s)
import Highway from '@dogstudio/highway';

// Module(s)
import MrRenderer from '../modules/renderers/default';
import MrTransition from '../modules/transitions/default';

// Method(s)
const init = () => {
	new Highway.Core({
        renderers: {
            custom: MrRenderer
        },
        transitions: {
            default: MrTransition
        }
    });
};

// Export(s)	
export {
	init
};