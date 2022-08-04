<template>
  <div class="auth-view__wrapper">
    <div class="auth-view__form">
      <h1>EVENT MANAGER</h1>

      <input
          v-model="state.email"
          placeholder="Email"
          type="email"
      />
      <input
          v-model="state.password"
          placeholder="Password"
          type="password"
      />

      <button @click="handleLogin">Sign in</button>

      <router-link to="/">Forgot password?</router-link>

      <div class="auth-view__form-link">
        <span>Don't have account?</span>
        <router-link to="/register">Sign up!</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import type { Ref } from "vue";
import type { Router } from "vue-router";
import type { LoginRequest } from "@/types/requests/LoginRequest";

import { useAuth } from "@/stores/auth";

import VulkanBackground from "@/components/ui/background/VulkanBackground.vue";
import BalloonBackground from "@/components/ui/background/BalloonBackground.vue";

export default defineComponent({
  name: "AuthView",

  components: {
    BalloonBackground,
    VulkanBackground,
  },

  setup() {
    const auth = useAuth();
    const state: Ref<LoginRequest> = ref({
      email: '',
      password: '',
    });
    const router: Router = useRouter();

    const handleLogin = () => auth.login(state.value)
        .then(() => router.push("/profile"));

    return {
      state,
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth-view {
  &__wrapper {
    height: 100vh;
  }

  &__wrapper, &__form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    flex-direction: column;
    min-width: 300px;

    > * {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    > h1 {
      background-image: -webkit-linear-gradient(45deg, #3AACFF, #D639EF);
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    > input, button {
      height: 45px;
      width: 100%;

      font-size: 20px;

      text-align: center;
      border-radius: 15px;
    }

    > input {
      background-color: #f8f8f8;
      border: 1px solid transparent;

      &:focus {
        transition: .3s ease;
        border: 1px solid dodgerblue;
      }
    }

    > button {
      border: transparent;

      background: linear-gradient(45deg, #3AACFF, #D639EF);
      color: white;

      &:hover {
        opacity: 0.8;
      }
    }

    > a {
      color: dodgerblue;
      text-decoration: none;
    }

    &-link {
      > span {
        margin-right: 5px;
      }

      > a {
        color: dodgerblue;
        text-decoration: none;
      }
    }
  }
}
</style>
