<template>
  <!-- <q-page class="flex flex-center bg-grey-3 column"> -->
  <q-page class="bg-grey-3 column">
    <q-list class="bg-white" separator bordered>
      <!--
          Rendering a <label> tag (notice tag="label")
          so QCheckboxes will respond to clicks on QItems to
          change Toggle state.
        -->

      <q-item
        v-for="todo in todos"
        :key="todo.id"
        @click="toggleTodoState(todo.id)"
        :class="{ 'todo-completed': todo.done }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <!-- Using no-pointer-events class to ignore all clicks on the checkbox, to let q-item handle click events -->
          <q-checkbox
            v-model="todo.done"
            class="no-pointer-events"
            color="primary"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ todo.text }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="todo.done" side>
          <q-btn
            @click.stop="deleteTodo(todo.id)"
            flat
            round
            dense
            color="primary"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!todos.length" class="no-todos absolute-center">
      <q-icon name="check" size="100px" color="primary" />

      <div class="text-h5 text-primary text-center">No Todos</div>
    </div>

    <!-- @todo Perhaps move to a big floating Plus button at the bottom right of the screen, esp on mobile view -->
    <!-- @todo Add keyboard trigger for desktop or bigger, where the character "N|n" triggers the function too -->
    <div class="fixed-bottom row q-pa-xs bg-primary">
      <q-input
        v-model="newTodo"
        @keydown.enter="addNewTodo"
        class="col"
        placeholder="Add new thing to do!"
        bg-color="white"
        filled
        square
        dense
      >
        <template v-slot:append>
          <q-btn @click="addNewTodo" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Todos",

  data() {
    return {
      newTodo: "",

      todos: [],
    };
  },

  methods: {
    addNewTodo() {
      // Prevent new todo from being created with empty string
      if (!this.newTodo) return;

      this.todos.push({
        // id: Math.trunc(Math.random() * 100),
        id: this.todos.length + 1,
        text: this.newTodo,
        done: false,
      });

      // Clear the text container once new container is created
      this.newTodo = "";
    },

    toggleTodoState(todoID) {
      const todo = this.todos.find((todo) => todoID === todo.id);
      todo.done = !todo.done;
    },

    deleteTodo(todoID) {
      // @todo Is this needed? Or let this be a setting?
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure??",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.todos.splice(
            this.todos.findIndex((todo) => todoID === todo.id),
            1
          );

          this.$q.notify("Todo deleted!");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-completed {
  // Needed to prevent the delete icon from having a strike through too
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.no-todos {
  opacity: 0.5;
}
</style>
