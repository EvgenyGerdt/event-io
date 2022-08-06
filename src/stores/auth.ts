import { defineStore } from "pinia";
import AuthService from "@/services/AuthService";

import type { LoginRequest } from "@/types/requests/LoginRequest";
import type { RegisterCredentials } from "@/types/RegisterCredentials";
import jwtDecode from "jwt-decode";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials: LoginRequest) {
      const token: string = await AuthService.login(credentials);
      const data: any = jwtDecode(token);

      localStorage.setItem("id", data.user._id);
      localStorage.setItem("token", token);
    },

    async register(user: RegisterCredentials) {
      await AuthService.register(user);
    },
  },
});
