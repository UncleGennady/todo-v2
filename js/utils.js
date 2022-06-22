'use strict';
const setEvent = (eventType, element, eventHandler) => {
   element.addEventListener(eventType,event => {
       event.preventDefault();
       event.stopPropagation();
       eventHandler.call(this, event);
   })
};
 function getElement (elementSearch, selector){
    if(!selector || !elementSearch) console.warn('function arguments were not passed');
    return elementSearch.querySelector(selector)

};
function getElements  (elementSearch, selectors){
    if(!selectors || !elementSearch) console.warn('function arguments were not passed');
    return elementSearch.querySelectorAll(selectors)
}


