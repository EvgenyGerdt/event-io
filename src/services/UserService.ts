import instance from "@/config/instance";
import type { AxiosResponse } from "axios";
import type { User } from "@/types/User";

export default class UserService {
  static async loadUser() {
    const id = localStorage.getItem("id");

    return await instance
      .get(`/user/${id}`)
      .then((res: AxiosResponse<User>) => res.data);
  }
}
