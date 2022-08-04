<template>
  <header class="header-menu__container">
    <h1 class="header-menu__title">
      EVENT MANAGER
    </h1>

    <div class="header-menu__menu-bar">
      <router-link
          to="/profile"
          class="header-menu__menu-bar-link"
          :class="route.name === 'Profile' ? 'active' : ''"
      >
        Profile
      </router-link>
      <router-link
          to="/friends"
          class="header-menu__menu-bar-link"
          :class="route.name === 'Friends' ? 'active' : ''"
      >
        Friends
      </router-link>
      <router-link
          to="/messages"
          class="header-menu__menu-bar-link"
          :class="route.name === 'Messages' ? 'active' : ''"
      >
        Messages
      </router-link>
      <router-link
          to="/events"
          class="header-menu__menu-bar-link"
          :class="route.name === 'Events' ? 'active' : ''"
      >
        Events
      </router-link>
      <router-link
          to="/settings"
          class="header-menu__menu-bar-link"
          :class="route.name === 'Settings' ? 'active' : ''"
      >
        Settings
      </router-link>
    </div>
  </header>

  <Suspense>
    <template #default>
      <router-view :key="route.name" />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

import Loader from "@/layouts/Loader.vue";

export default defineComponent({
  name: "HeaderMenu",

  components: {
    Loader,
  },

  setup() {
    const route: RouteLocationNormalized = useRoute();

    return {
      route,
    };
  },
})
</script>

<style lang="scss" scoped>
.header-menu {
  &__container {
    text-align: center;
    padding: 40px;
  }

  &__title {
    background-image: -webkit-linear-gradient(0.45turn, #3AACFF, #D639EF);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    margin-bottom: 50px;

    font-weight: bold;
  }

  &__menu {
    &-bar {
      &-link {
        font-size: 28px;
        font-weight: bold;
        text-decoration: none;

        color: #A0A0A0;

        margin: 0 15px;

        font-family: "InterBold", sans-serif;
      }
    }
  }
}

.active {
  color: black;
}
</style>
