import { defineStore } from "pinia";
import UserService from "@/services/UserService";

import type { User } from "@/types/User";

export const useProfile = defineStore("profile", {
  state: () => ({
    data: {} as User,
    loaded: false,
  }),

  getters: {
    user: (state) => state.data as User,
  },

  actions: {
    async loadProfile() {
      if (!this.loaded) {
        try {
          this.data = await UserService.loadUser();
          return this.data;
        } finally {
          this.loaded = true;
        }
      }

      return this.data;
    },
  },
});
