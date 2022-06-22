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

    console.log(todos);
    model.init(todoKey);
    view.init(form);
    const getDataFromInputs = inputs =>{
        if(!inputs) throw new Error('You should provide inputs');
        const data = Array.from(inputs).reduce((acc,item)=>{
        acc[item.name] = item.value;
        return acc},{});
        console.log(data);
        return data;
        }
    const setData = model.setData();
    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const data = getDataFromInputs(inputs);
        const savedData = setData(data);
        console.log(savedData);
        if(!savedData.success) throw new Error('cannot save data');
        // dataToDelete = savedData.fullData;
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
        console.log(id);

        for (let el of data) {
            if(el.id === id) data.splice(data.indexOf(el), 1);
        }
        dataToDelete.forEach(item => {if(item.id === id) dataToDelete.splice(dataToDelete.indexOf(item), 1)});
        localStorage.removeItem(todoKey);
        if(!!data.length) localStorage.setItem(todoKey,JSON.stringify(dataToDelete));
    }

    // const selectStatus = (event)
    todos.addEventListener('click', deleteHandler);
    form.addEventListener(submit, submitHandler);
    document.addEventListener('DOMContentLoaded',loadedHandler);




}