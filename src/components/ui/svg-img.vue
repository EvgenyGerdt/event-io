<template>
  <component :is="dynamicComponent" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "svg-img",

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`./svg/${name}.vue`));
    },
  },
};
</script>
