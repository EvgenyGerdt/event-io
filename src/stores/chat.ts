import { defineStore } from "pinia";
import type { ChatMessage } from "@/types/ChatMessage";

export const useChat = defineStore('chat', {
    state: () => ({
        data: [] as ChatMessage[],
    }),

    getters: {
        messages: (state) => state.data as ChatMessage[],
    },
    actions: {
        addMessage(message: ChatMessage) {
            this.data.push(message);
        },
    }
});
