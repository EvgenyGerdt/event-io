import { defineStore } from "pinia";
import instance from "@/config/instance";

import type { AxiosResponse, AxiosError } from "axios";
import type { FriendItem } from "@/types/FriendItem";
import type { FriendshipRequest } from "@/types/FriendshipRequest";

export const useFriends = defineStore('friends', {
    state: () => ({
        data: [] as FriendItem[],
        requestList: [] as FriendshipRequest[],
        friendList: [] as FriendItem[],
        hasError: false,
    }),

    getters: {
        users: (state) => state.data as FriendItem[],
        requests: (state) => state.requestList as FriendshipRequest[],
        friends: (state) => state.friendList as FriendItem[],
    },

    actions: {
        async findList(searchField: string) {
            try {
                this.data = await instance.get('/api/v1/user', {
                    params: {
                        searchField,
                    },
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                }).then((res: AxiosResponse<FriendItem[]>) => res.data);
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        },

        async getFriendList() {
            try {
                this.friendList = await instance.get(`/api/v1/friends/${localStorage.getItem('id')}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                }).then((res: AxiosResponse<FriendItem[]>) => res.data);
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        },

        async getRequests() {
            try {
                this.requestList = await instance.get(`/api/v1/friends/requests/${localStorage.getItem('id')}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                }).then((res: AxiosResponse<FriendshipRequest[]>) => res.data);
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        },

        async acceptFriendRequest(id: string) {
            try {
                await instance.put(`/api/v1/friends/submit/${id}`,{}, {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                });
                await this.getRequests();
                await this.getFriendList();
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        },

        async declineFriendRequest(id: string) {
            try {
                await instance.put(`/api/v1/friends/decline/${id}`, {}, {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                });
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        },

        async sendFriendshipRequest(id: string) {
            try {
                await instance.put(`/api/v1/friends/request`, {
                    from: localStorage.getItem('id'),
                    to: id,
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    },
                });
            } catch (e: AxiosError | any) {
                this.hasError = true;
                console.error(e.message);
            }
        }
    }
});
