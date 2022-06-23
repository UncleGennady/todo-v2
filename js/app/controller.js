'use strict';

function controller(view, model, config){
    const formSelector = config.formSelector;
    const inputsSelector = config.inputsSelector;
    const submit = config.event;
    const todoKey = config.formSelector;
    const todoContainer = config.todoContainer;
    const form = getElement(document,formSelector);
    const inputs = getElements(form, inputsSelector);
    const todos = getElement(document, todoContainer);
    let dataToDelete = null;
    const classDeleteEl = config.classDeleteEl;
    const selectSelector = config.selectSelector;

    model.init(todoKey);
    view.init(form);
    const getDataFromInputs = inputs =>{
        if(!inputs) throw new Error('You should provide inputs');
        const data = Array.from(inputs).reduce((acc,item)=>{
        acc[item.name] = item.value;
        return acc},{});
        return data;
        }
    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const data = getDataFromInputs(inputs);
        const savedData = model.setData(data);
        if(!savedData.success) throw new Error('cannot save data');
        view.renderTodoElement(savedData.data);
        view.clearForm();

    }
    const loadedHandler = () =>{
        const data = model.getData();
        if(!data) return;
        view.renderTodoElements(data);
    }
    const deleteHandler = (event) =>{
        dataToDelete = model.getData();
        if(dataToDelete === null) return;
        if(event.target.classList.value !== classDeleteEl) return;
        const data = model.getData();
        if(!data) return;
        const id =  +(view.deleteTodoElement(event.target))
        model.reloadData(dataToDelete, id);
    }
    const statusHandler = (event)=>{
        const value = +event.target.value
        if(!value) return;
        const status = value === 1 ? 'pending' : 'completed' ;
        const data = model.getData()
        const id = getID(event.target);
        model.setStatus(data,id,status);
       }
    todos.addEventListener('click', deleteHandler);
    form.addEventListener(submit, submitHandler);
    document.addEventListener('DOMContentLoaded',loadedHandler);
    todos.addEventListener('click',statusHandler);
}