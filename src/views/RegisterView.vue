<template>
  <div class="auth-view__wrapper">
    <div class="auth-view__form">
      <h1>EVENT MANAGER</h1>

      <input
          v-model="state.username"
          placeholder="Username"
          type="text"
      />
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
      <input
          v-model="state.firstName"
          placeholder="First Name"
          type="text"
      />
      <input
          v-model="state.lastName"
          placeholder="Last Name"
          type="text"
      />

      <select v-model="state.gender" id="genders" name="genders">
        <option :value="true">
          Male
        </option>
        <option :value="false">
          Female
        </option>
      </select>

      <input
          v-model="state.birthday"
          placeholder="Birthday"
          type="date"
          lang="en-US"
      />

      <button @click="handleRegister">Sign up</button>

      <div class="auth-view__form-link">
        <span>Already have account?</span>
        <router-link to="/">Sign in!</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

import type { Ref } from "vue";
import type { Router } from "vue-router";
import type { RegisterCredentials } from "@/types/RegisterCredentials";

export default defineComponent({
  name: "RegisterView",

  setup() {
    const router: Router = useRouter();
    const auth = useAuth();
    const state: Ref<RegisterCredentials> = ref({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: true,
      birthday: '',
    });

    const handleRegister = () => {
      auth.register(state.value)
          .then(() => router.push('/'));
    };

    return {
      state,
      handleRegister,
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

    > input, button, select {
      height: 45px;
      width: 100%;

      font-size: 20px;

      text-align: center;
      border-radius: 15px;
    }

    > input, select {
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
