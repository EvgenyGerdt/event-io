import { defineStore } from "pinia";
import type { ChatMessage } from "@/types/ChatMessage";
import ChatService from "@/services/ChatService";

export const useChat = defineStore("chat", {
  state: () => ({
    data: [] as ChatMessage[],
    chats: [] as any[],
  }),

  getters: {
    messages: (state) =>
      state.data.sort((m1, m2) => {
        return new Date(Number(m1.date)) - new Date(Number(m2.date));
      }) as ChatMessage[],
  },
  actions: {
    addMessage(message: ChatMessage) {
      this.data.push(message);
    },

    async getChats() {
      this.chats = await ChatService.getChats();
    },

    async loadChat(id: string) {
      this.data = await ChatService.getChat(id);
    },
  },
});
