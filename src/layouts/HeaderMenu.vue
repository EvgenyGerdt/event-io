<template>
  <header class="header-menu__container">
    <div class="header-menu__title">
      <div>
        <input v-model="themeSwitch" id="switch" type="checkbox" />
        <label for="switch">
          <transition name="fade" mode="in-out" duration="100">
            <font-awesome-icon v-if="!themeSwitch" icon="sun" />
            <font-awesome-icon v-else icon="moon" />
          </transition>
        </label>
      </div>
      <h1 class="header-menu__title-text">EVENT MANAGER</h1>
      <div class="header-menu__title-logout">
        <span>EXIT</span>
        <font-awesome-icon icon="arrow-right-from-bracket" />
      </div>
    </div>

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
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import useSocket from "@/hooks/useSocket";

import Loader from "@/layouts/Loader.vue";

import Connection from "@/models/Connection";

import type { RouteLocationNormalized } from "vue-router";

export default defineComponent({
  name: "HeaderMenu",

  components: {
    Loader,
  },

  setup() {
    const themeSwitch = ref(false);
    const socket = useSocket();
    const route: RouteLocationNormalized = useRoute();

    onBeforeMount(() =>
      socket.emit("user_connected", {
        user: new Connection({
          userId: localStorage.getItem("id") as string,
          id: socket.id,
        }),
      })
    );

    onBeforeUnmount(() =>
      socket.emit("user_disconnected", {
        user: new Connection({
          userId: localStorage.getItem("id") as string,
          id: socket.id,
        }),
      })
    );

    return {
      route,
      themeSwitch,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-menu {
  &__container {
    text-align: center;
    padding: 40px;
  }

  &__title {
    display: flex;
    justify-content: space-around;
    align-content: center;
    &-text {
      background-image: -webkit-linear-gradient(0.45turn, #3aacff, #d639ef);
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      margin-bottom: 50px;

      font-weight: bold;
    }

    &-logout {
      color: #a0a0a0;
      cursor: pointer;

      &:hover {
        background-image: -webkit-linear-gradient(0.45turn, #3aacff, #d639ef);
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        color: #9e33ff;
      }

      > span {
        margin-right: 10px;
        font-weight: bold;
      }
    }
  }

  &__menu {
    &-bar {
      &-link {
        font-size: 28px;
        font-weight: bold;
        text-decoration: none;

        color: #a0a0a0;

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
