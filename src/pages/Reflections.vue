<template>
  <!-- <q-page class="flex flex-center bg-grey-3 column"> -->
  <q-page class="bg-grey-3 column">
    <q-list class="bg-white" separator bordered>
      <!--
          Rendering a <label> tag (notice tag="label")
          so QCheckboxes will respond to clicks on QItems to
          change Toggle state.
        -->

      <!-- @todo Perhaps move to a big floating Plus button at the bottom right of the screen, esp on mobile view -->
      <!-- @todo Add keyboard trigger for desktop or bigger, where the character "N|n" triggers the function too -->
      <q-select
        use-input
        :value="newTodo"
        hide-selected
        fill-input
        input-debounce="0"
        label="What did you do Today?"
        :options="options"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        @keydown.enter="addNewTodo"
      />

      <!-- dropdown here for the input box -->

      <q-item
        v-for="todo in todos"
        :key="todo.id"
        @click="toggleTodoState(todo.id)"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ todo.text }}</q-item-label>
        </q-item-section>

        <q-item-section side>
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

      <div class="text-h5 text-primary">Nothing<br />completed<br />yet</div>
    </div>
  </q-page>
</template>

<script>
// These should be the past things the user already did, pre load it first
const stringOptions = ["Workout", "Eat healthy", "Studied", "Work on startup"];

export default {
  name: "Reflections",

  data() {
    return {
      newTodo: "",

      todos: [],

      options: stringOptions,
    };
  },

  methods: {
    filterFn(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(update, 600, () => {
        if (val === "") this.options = stringOptions;
        else {
          // @todo This can probably be optimized
          const needle = val.toLowerCase();
          this.options = stringOptions.filter(
            (option) => option.toLowerCase().indexOf(needle) > -1
          );
        }

        console.log(this.newTodo);
      });
    },

    abortFilterFn() {
      // Can kill any network calls if there any...
      // console.log("delayed filter aborted");
    },

    addNewTodo() {
      // Prevent new todo from being created with empty string
      if (!this.newTodo) return;

      this.todos.push({
        // id: Math.trunc(Math.random() * 100),
        id: this.todos.length + 1,
        text: this.newTodo,
      });

      // Clear the text container once new container is created
      this.newTodo = "";
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
.no-todos {
  opacity: 0.5;
}
</style>
