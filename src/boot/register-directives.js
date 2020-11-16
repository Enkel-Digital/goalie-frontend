// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  // Register global custom directive called `v-autofocus`
  Vue.directive("autofocus", {
    // Custom directive to autofocus on a input element
    // When the bound element is inserted into the DOM...
    inserted(element) {
      element.focus(); // Focus the element
    },
  });
};
