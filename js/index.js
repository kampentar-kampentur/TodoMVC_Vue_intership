class TodoApp {
    constructor(el, id) {
        this.appElement = el;
        this.id = id;
        this.model = new TodoListModel(this.id);
        this.vm = new Vue({
            el: el,
            data: {
                todoList: this.model.todoList,
            }
        });
    }
}

let element = document.querySelector('.todoapp');
let todoApp = new TodoApp(element, 'vue');