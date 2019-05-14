class TodoItemModel {
  constructor(value, id, state = false) {
    this.value = value;
    this.checked = state;
    this.id = id;
  }
}

let vm = new Vue({
  el: '.todoapp',
  data: {
    todoList: [],
    filteredList: [],
    filter: 'all',
    value: '',
    test: true,
    toggleAll: false,
  },
  computed: {
    filterList() {
      return this.todoList.filter((e) => {
        switch (this.filter) {
          case 'completed':
            return e.checked;
          case 'active':
            return !e.checked;
        }
        return true;
      });
    }
  },
  methods: {
    addTodo() {
      if (this.value === '') return;
      this.todoList.push(new TodoItemModel(this.value, new Date().getTime()));
      this.value = '';
    },
    removeTodo(id) {
      const index = this.todoList.findIndex(todo => todo.id === id)
      if (index === -1) return;
      this.todoList.splice(index, 1);
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
    },
    completeAll() {
      for (let i = 0; i < this.todoList.length; i++) {
        this.todoList[i].checked = !this.toggleAll;
      }
    }
  },
})
