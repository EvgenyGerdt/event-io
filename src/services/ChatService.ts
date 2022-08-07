import instance from "@/config/instance";
import type { AxiosResponse } from "axios";

export default class ChatService {
  static async getChats() {
    return await instance
      .get(`/chats/${localStorage.getItem("id")}`)
      .then((res: AxiosResponse<any[]>) => res.data);
  }

  static async getChat(id: string) {
    return await instance
      .get(`/chats/${localStorage.getItem("id")}/with/${id}`)
      .then((res: AxiosResponse<any[]>) => res.data);
  }
}
