<template>
  <div class="messages-view__container">
    <router-view :key="route.name" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MessagesView",

  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>

<style scoped>
.messages-view__container {
  text-align: center;
}
</style>
