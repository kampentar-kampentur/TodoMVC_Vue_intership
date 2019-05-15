function TodoApp(appId, element) {
  function saveState(todoList) {
    try {
      return localStorage.setItem(`todo-${appId}`, JSON.stringify(todoList));
    } catch (e) { }
  }
  function restoreTodoList() {
    try {
      return JSON.parse(localStorage.getItem(`todo-${appId}`));
    } catch (e) { }
  }

  class TodoItemModel {
    constructor(value, id, state = false) {
      this.value = value;
      this.checked = state;
      this.id = id;
    }
  }

  let vm = new Vue({
    el: element,
    data: {
      todoList: restoreTodoList() || [],
      filteredList: [],
      filter: window.location.hash,
      value: '',
      test: true,
      editableTodo: -1,
      // toggleAll: false,
    },
    computed: {
      filterList() {
        return this.todoList.filter((e) => {
          switch (this.filter) {
            case '#/completed':
              return e.checked;
            case '#/active':
              return !e.checked;
          }
          return true;
        });
      },
      toggleAll() {
        return this.todoList.filter(e => e.checked).length === this.todoList.length;
      }
    },
    watch: {
      todoList: {
        deep: true,
        handler: saveState,
      }
    },
    methods: {
      addTodo() {
        if (this.value === '') return;
        this.todoList.push(new TodoItemModel(this.value, new Date().getTime()));
        this.value = '';
        saveState(this.todoList);
      },
      removeTodo(id) {
        const index = this.todoList.findIndex(todo => todo.id === id)
        if (index === -1) return;
        this.todoList.splice(index, 1);
        saveState(this.todoList);
      },
      changeFilter(filter) {
        if (filter === this.filter) return;
        this.filter = filter;
      },
      clearCompleted() {
        for (let i = 0; i < this.todoList.length; i++) {
          if (this.todoList[i].checked) {
            this.todoList.splice(i, 1);
            i--;
          }
        }
        saveState(this.todoList);
      },
      completeAll(state) {
        for (let i = 0; i < this.todoList.length; i++) {
          this.todoList[i].checked = !state;
        }
        saveState(this.todoList);
      },
      editTodo(index) {
        this.editableTodo = index;
      },
      doneEditTodo(id) {
        const index = this.todoList.findIndex(todo => todo.id === id)
        if (index === -1) return;
        if (this.todoList[index].value === '') {
          this.todoList.splice(index, 1);
        }
        this.editableTodo = -1;
      }
    },
    directives: {
      focus: function (el, bind) {
        if (bind.value) {
          el.focus()
        }
      }
    }
  });
  return vm;
}
