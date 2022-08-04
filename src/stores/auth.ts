import { defineStore } from "pinia";

import instance from "@/config/instance";

import type { AxiosResponse } from "axios";
import type { LoginRequest } from "@/types/requests/LoginRequest";
import type { LoginResponse } from "@/types/responses/LoginResponse";
import type { RegisterCredentials } from "@/types/RegisterCredentials";
import jwtDecode from "jwt-decode";

export const useAuth = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        hasLoading: false,
        hasError: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        loading: (state) => state.hasLoading,
        error: (state) => state.hasError,
    },
    actions: {
        async login(credentials: LoginRequest) {
            this.hasLoading = true;

            try {
                const token: string | Promise<string> = await instance.post('/api/v1/login', credentials)
                    .then((res: AxiosResponse<LoginResponse>) => res.data.token);

                const data: any = jwtDecode(token);

                localStorage.setItem('id', data.user._id);
                localStorage.setItem('token', token);
            } catch (e) {
                this.hasError = true;
            } finally {
                this.hasLoading = false;
            }
        },

        async register(user: RegisterCredentials) {
            this.hasLoading = true;

            try {
                await instance.post('/api/v1/register', user);
            } catch (e) {
                this.hasError = true;
            } finally {
                this.hasLoading = false;
            }
        }
    }
});
