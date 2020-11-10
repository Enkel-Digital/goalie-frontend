<template>
  <v-main id="Todos">
    <div class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>

      <div class="main" v-show="todos.length" v-cloak>
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDone"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            />
          </li>
        </ul>
      </div>

      <!-- Move this to the top, so that it wont move around when the list is of different length -->
      <footer
        class="footer"
        v-show="todos.length"
        v-cloak
        style="padding-bottom: 2em"
      >
        <span class="todo-count">
          <strong>{{ remaining }}</strong> item(s) left
        </span>

        <!-- @todo Change these filters to change the props instead -->
        <!-- Or instead, call the router by name instead of redirection -->
        <ul class="filters">
          <li>
            <a href="#/todo/all" :class="{ selected: visibility == 'all' }">
              All
            </a>
          </li>
          <li>
            <a
              href="#/todo/active"
              :class="{ selected: visibility == 'active' }"
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/todo/completed"
              :class="{ selected: visibility == 'completed' }"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >
          Clear completed
        </button>
      </footer>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";

// Full spec-compliant TodoMVC with localStorage persistence and hash-based routing

// localStorage persistence
const STORAGE_KEY = "todos-vuejs-2.0";

// Make this into a service, either on vuex or something.
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo, index) => (todo.id = index));
    todoStorage.uid = todos.length;

    return todos;
  },

  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

// visibility filters
const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};

export default {
  name: "Todos",

  created() {
    // this.$store.dispatch("links/getLinks");
  },

  props: {
    visibility: { default: "all" },
  },

  data() {
    return {
      todos: todoStorage.fetch(),

      newTodo: "",
      editedTodo: null,
      // visibility: "all",
    };
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true,
    },
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      },
    },
  },

  methods: {
    addTodo() {
      const newTodo = this.newTodo && this.newTodo.trim();
      if (!newTodo) return;

      this.todos.push({
        // id: todoStorage.uid++,
        id: Math.random(),
        title: newTodo,
        completed: false,
      });

      this.newTodo = "";
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted() {
      this.todos = filters.active(this.todos);
    },

    // ...mapActions("links", ["deleteLink"]),
  },
};
</script>

<style scoped>
#Todos {
  text-align: left;
  /* padding: 0 !important; */
}

[v-cloak] {
  display: none;
}
</style>

<style src="./style.css" />
