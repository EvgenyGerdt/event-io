import instance from "@/config/instance";

import type { AxiosResponse } from "axios";
import type { LoginRequest } from "@/types/requests/LoginRequest";
import type { LoginResponse } from "@/types/responses/LoginResponse";
import type { RegisterCredentials } from "@/types/RegisterCredentials";

export default class AuthService {
  private static endpoints = {
    register: "/register",
    login: "/login",
  };

  static async login(credentials: LoginRequest) {
    return await instance
      .post(this.endpoints.login, credentials)
      .then((res: AxiosResponse<LoginResponse>) => res.data.token);
  }

  static async register(user: RegisterCredentials) {
    await instance.post(this.endpoints.register, user);
  }
}
