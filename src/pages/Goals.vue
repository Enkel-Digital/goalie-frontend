<template>
  <!-- <q-page class="flex flex-center bg-grey-3 column"> -->
  <q-page class="bg-grey-3 column">
    <!-- @todo Perhaps move to a big floating Plus button at the bottom right of the screen, esp on mobile view -->
    <!-- @todo Add keyboard trigger for desktop or bigger, where the character "N|n" triggers the function too -->
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newGoal"
        @keydown.enter="addNewGoal"
        class="col"
        placeholder="Create a new Goal!"
        bg-color="white"
        filled
        square
        dense
      >
        <template v-slot:append>
          <q-btn @click="addNewGoal" round dense flat icon="add" />
        </template>
      </q-input>
    </div>

    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="todo in goals"
        :key="todo.id"
        :class="{ 'todo-completed': todo.done }"
      >
        <q-item-section avatar>
          <q-checkbox v-model="todo.done" color="primary" />
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

    <div v-if="!goals.length" class="no-goals absolute-center">
      <q-icon name="check" size="100px" color="primary" />

      <div class="text-h5 text-primary text-center">No Goals</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Goals",

  data() {
    return {
      newGoal: "",

      goals: [],
    };
  },

  methods: {
    addNewGoal() {
      // Prevent new todo from being created with empty string
      if (!this.newGoal) return;

      this.goals.push({
        // id: Math.trunc(Math.random() * 100),
        id: this.goals.length + 1,
        text: this.newGoal,
        done: false,
      });

      // Clear the text container once new container is created
      this.newGoal = "";
    },

    toggleGoalState(todoID) {
      const todo = this.goals.find((todo) => todoID === todo.id);
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
          this.goals.splice(
            this.goals.findIndex((todo) => todoID === todo.id),
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

.no-goals {
  opacity: 0.5;
}
</style>
