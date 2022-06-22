'use strict';

const config ={
    formSelector: '#todoForm',
    todoContainer: '#todoItems',
    inputsSelector:'input, textarea',
    event: 'submit',
    classDeleteEl : 'taskDelete',
    selectSelector: 'form-selector',
}

void function (){
    controller(view(),model(),config)
}()