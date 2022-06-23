'use strict';
 function getElement (elementSearch, selector){
    if(!selector || !elementSearch) console.warn('function arguments were not passed');
    return elementSearch.querySelector(selector)

};
function getElements  (elementSearch, selectors){
    if(!selectors || !elementSearch) console.warn('function arguments were not passed');
    return elementSearch.querySelectorAll(selectors)
}
function getID(elSerch){
   return +(elSerch.parentElement.parentElement.getAttribute('data-todo-id'));
}


