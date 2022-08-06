import { defineStore } from "pinia";

import FriendsService from "@/services/FriendsService";

import type { AxiosError } from "axios";
import type { PersonItem } from "@/types/PersonItem";
import type { FriendshipRequest } from "@/types/requests/FriendshipRequest";

export const useFriends = defineStore("friends", {
  state: () => ({
    data: [] as PersonItem[],
    requestList: [] as FriendshipRequest[],
    friendList: [] as PersonItem[],
    hasError: false,
  }),

  getters: {
    users: (state) => state.data as PersonItem[],
    requests: (state) => state.requestList as FriendshipRequest[],
    friends: (state) => state.friendList as PersonItem[],
  },

  actions: {
    async findList(searchField: string) {
      try {
        this.data = await FriendsService.findList(searchField);
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },

    async getFriendList() {
      try {
        this.friendList = await FriendsService.getFriendList();
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },

    async getRequests() {
      try {
        this.requestList = await FriendsService.getFriendshipRequests();
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },

    async acceptFriendRequest(id: string) {
      try {
        await FriendsService.acceptFriendshipRequest(id);
        await FriendsService.getFriendshipRequests();
        await FriendsService.getFriendList();
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },

    async declineFriendRequest(id: string) {
      try {
        await FriendsService.declineFriendshipRequest(id);
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },

    async sendFriendshipRequest(id: string) {
      try {
        await FriendsService.sendFriendshipRequest(id);
      } catch (e: AxiosError | any) {
        this.hasError = true;
      }
    },
  },
});
