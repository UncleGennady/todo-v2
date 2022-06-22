'use strict';

function view(){
    const todoContainer = config.todoContainer
    function createTodoElement(data){
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-todo-id', data.id)
        wrapper.innerHTML = `<div class="taskWrapper">
                                <div class="taskInfo">
                                    <div class="taskHeading">${data.title}</div>
                                    <div class="taskDescription">${data.description}</div>
                                </div>
                                <button class="taskDelete"></button>
                                <select class="form-select" aria-label="Default select example">
                                    <option value="1" selected>Без статуса</option>
                                    <option value="2">В работе</option>
                                    <option value="3">Завершен</option>
                                </select>
                            </div>`
        return wrapper;
    }
    return{

        clearForm(){
            console.log(this.form);
            this.form.reset();
        },

        renderTodoElement(dataToRender){
            const todoList = getElement(document,todoContainer);
            todoList.append(createTodoElement(dataToRender));
        },
        renderTodoElements(data){
            const todoList = getElement(document,todoContainer);
            data.forEach(item =>todoList.append(createTodoElement(item)))
        },
        deleteTodoElement(button){
            const todoEl = button.parentElement.parentElement
            const id = todoEl.getAttribute('data-todo-id')
            console.log(id);
            if(!id) return;
            todoEl.remove()
            return id;
        },
        init(form) {
            this.form = form;
        }

    }
}