<template>
  <RouterView v-slot="{ Component }" v-if="!auth.isAuthenticated">
    <component :is="Component" />
    <VulkanBackground />
    <BalloonBackground />
    <WavesBackground />
  </RouterView>

  <RouterView v-slot="{ Component }" v-else>
    <component :is="Component" />
    <VulkanBackground />
    <WavesBackground />
  </RouterView>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import useSocket from "@/hooks/useSocket";

import { useAuth } from "@/stores/auth";

import Loader from "@/layouts/Loader.vue";

import HeaderMenu from "@/layouts/HeaderMenu.vue";
import VulkanBackground from "@/layouts/VulkanBackground.vue";
import BalloonBackground from "@/layouts/BalloonBackground.vue";
import WavesBackground from "@/layouts/WavesBackground.vue";

export default defineComponent({
  name: "App",
  components: {
    Loader,
    HeaderMenu,
    VulkanBackground,
    BalloonBackground,
    WavesBackground,
  },

  setup() {
    const auth = useAuth();
    const route = useRoute();
    const socket = useSocket();

    onBeforeMount(() => socket.connect());
    onBeforeUnmount(() => socket.disconnect());

    return {
      auth,
      route,
    };
  },
});
</script>

<style>
@font-face {
  font-family: "InterRegular";
  src: local("InterRegular"),
    url("./assets/fonts/Inter-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "InterBold";
  src: local("InterBold"),
    url("./assets/fonts/Inter-Bold.ttf") format("truetype");
}

body {
  overflow: hidden;
}

* {
  font-family: "InterRegular", sans-serif;
}

h1,
h2,
h3,
h4,
h4,
h5 {
  font-family: "InterBold", sans-serif;
}

body {
  padding: 0;
  margin: 0;
}

button,
a {
  cursor: pointer;
  transition: all 0.3s ease;
}

a:hover {
  opacity: 0.8;
}

input,
select {
  outline: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
