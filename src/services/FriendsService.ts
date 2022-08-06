import instance from "@/config/instance";
import type { AxiosResponse } from "axios";
import type { PersonItem } from "@/types/PersonItem";
import type { FriendshipRequest } from "@/types/requests/FriendshipRequest";

export default class FriendsService {
  static async findList(searchField: string): Promise<PersonItem[]> {
    return await instance
      .get("/user", {
        params: {
          searchField,
        },
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      })
      .then((res: AxiosResponse<PersonItem[]>) => res.data);
  }

  static async getFriendList(): Promise<PersonItem[]> {
    return await instance
      .get(`/friends/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      })
      .then((res: AxiosResponse<PersonItem[]>) => res.data);
  }

  static async getFriendshipRequests(): Promise<FriendshipRequest[]> {
    return await instance
      .get(`/friends/requests/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      })
      .then((res: AxiosResponse<FriendshipRequest[]>) => res.data);
  }

  static async acceptFriendshipRequest(id: string): Promise<void> {
    await instance.put(
      `/friends/submit/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      }
    );
  }

  static async declineFriendshipRequest(id: string): Promise<void> {
    await instance.put(
      `/friends/decline/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      }
    );
  }

  static async sendFriendshipRequest(id: string): Promise<void> {
    await instance.put(
      `/friends/request`,
      {
        from: localStorage.getItem("id"),
        to: id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") as string,
        },
      }
    );
  }
}
