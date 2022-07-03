'use strict';

const config ={
    formSelector: '#todoForm',
    todoContainer: '#todoItems',
    inputsSelector:'input, textarea',
    event: 'submit',
    classDeleteEl : 'taskDelete',
    statusValue:['no-status','pending','completed']
}

void function (){
    controller(view(),model(),config)
}()