<template>
  <div class="chat-view__container">
    <div
      class="chat-view__message"
      v-for="(message, index) in chat.messages"
      :key="`${message}_${index}`"
    >
      <p>{{ message.from }}</p>
      <p>{{ message.text }}</p>
    </div>

    <input placeholder="Write message..." v-model="messageField" />

    <button @click="sendMessage">Send message</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { useChat } from "@/stores/chat";

import useSocket from "@/hooks/useSocket";

import type { ChatMessage } from "@/types/ChatMessage";

export default defineComponent({
  name: "ChatView",

  setup() {
    const messageField = ref("");
    const route = useRoute();
    const socket = useSocket();

    const chat = useChat();

    const sendMessage = () => {
      const message: ChatMessage = {
        text: messageField.value,
        date: Date.now().toString(),
        from: localStorage.getItem("id") as string,
        to: route.params.id as string,
      };

      socket.emit("message", { message });

      chat.addMessage(message);
      messageField.value = "";
    };

    socket.on("message", ({ message }) => chat.addMessage(message));

    return {
      chat,
      messageField,
      sendMessage,
    };
  },
});
</script>

<style scoped></style>
