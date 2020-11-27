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

    <!-- @todo Add a ordering system to the goals
        So we can look at long/mid/short term goals in their respective row groupings.
    -->

    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="goal in goals"
        :key="goal.id"
        :class="{ 'goal-completed': goal.done }"
      >
        <q-item-section avatar>
          <q-checkbox v-model="goal.done" color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ goal.text }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="goal.done" side>
          <q-btn
            @click.stop="deleteGoal(goal.id)"
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
      <q-icon name="check" size="50vw" color="primary" />

      <div class="text-h5 text-primary text-center">Create a new Goal!</div>
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
      // Prevent new goal from being created with empty string
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

    toggleGoalState(goalID) {
      const goal = this.goals.find((goal) => goalID === goal.id);
      goal.done = !goal.done;
    },

    deleteGoal(goalID) {
      // @goal Is this needed? Or let this be a setting?
      this.$q
        .dialog({
          title: "Delete Goal Permanently",
          message: "Are you sure??",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.goals.splice(
            this.goals.findIndex((goal) => goalID === goal.id),
            1
          );

          this.$q.notify("Goal deleted!");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.goal-completed {
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
