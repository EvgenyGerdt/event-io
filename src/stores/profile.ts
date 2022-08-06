import { defineStore } from "pinia";
import instance from "@/config/instance";

import type { AxiosResponse } from "axios";
import type { User } from "@/types/User";

export const useProfile = defineStore("profile", {
  state: () => ({
    data: {} as User,
    hasLoading: false,
    hasError: false,
    loaded: false,
  }),

  getters: {
    user: (state) => state.data as User,
    loading: (state) => state.hasLoading,
  },

  actions: {
    async loadProfile() {
      const id = localStorage.getItem("id");

      if (!this.loaded) {
        this.hasLoading = true;
        try {
          this.data = await instance
            .get(`/api/v1/user/${id}`, {
              headers: {
                Authorization: localStorage.getItem("token") as string,
              },
            })
            .then((res: AxiosResponse<User>) => res.data);
        } catch (e) {
          this.hasError = true;
        } finally {
          this.loaded = true;
          this.hasLoading = false;
        }
      }

      return this.data;
    },
  },
});
