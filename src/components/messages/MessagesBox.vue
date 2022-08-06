<template>
  <div class="messages-box__container">
    <div class="messages-box__empty" v-if="empty">
      <font-awesome-icon icon="face-rolling-eyes" />
      <span>Send first message!</span>
    </div>

    <div class="messages-box__content" v-else>
      <div
        class="messages-box__content-item"
        v-for="(message, index) in chat.messages"
        :key="`${message}_${index}`"
        :class="message.from === currentId ? 'owner' : 'other'"
      >
        <div>
          {{ message.text }}
          <div class="message-box__content-item date">
            {{ formatDate(new Date(Number(message.date))) }}
          </div>
        </div>
      </div>
    </div>
    <input
      placeholder="Enter your message"
      type="text"
      v-model="messageBody"
      @keyup.enter="sendMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import useSocket from "@/hooks/useSocket";
import { useChat } from "@/stores/chat";

import type { ComputedRef, Ref } from "vue";
import type { ChatMessage } from "@/types/ChatMessage";

import dateFormat from "dateformat";

export default defineComponent({
  name: "MessagesBox",

  setup() {
    const socket = useSocket();
    const messageBody: Ref<string> = ref("");
    const chat = useChat();
    const route = useRoute();
    const currentId: string = localStorage.getItem("id") as string;

    const empty: ComputedRef<boolean> = computed(() => chat.data.length === 0);

    watch(
      () => route.params.id,
      (value) => value && chat.loadChat(value as string)
    );

    const sendMessage = () => {
      const message: ChatMessage = {
        text: messageBody.value,
        date: Date.now().toString(),
        from: localStorage.getItem("id") as string,
        to: route.params.id as string,
      };

      socket.emit("message", { message });

      chat.addMessage(message);
      messageBody.value = "";
    };

    const formatDate = (date: Date) => {
      return dateFormat(date);
    };

    socket.on("message", ({ message }) => chat.addMessage(message));

    onMounted(() => chat.loadChat(route.params.id as string));

    return {
      empty,
      chat,
      messageBody,
      currentId,
      sendMessage,
      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.messages-box {
  &__container {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > input {
      height: 40px;
      border: none;

      padding: 0 15px;
      border-bottom: 1px solid #eaeaea;
      border-top: 1px solid #eaeaea;

      transition: all 300ms ease;
      &:focus {
        border-bottom: 1px solid #a63aff;
        border-top: 1px solid #a63aff;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;

    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 1em;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #eaeaea;
      border-radius: 1em;
    }

    &-item {
      margin: 10px 0;

      &.owner {
        text-align: right;

        > div {
          width: fit-content;
          padding: 10px;
          color: white;
          background: dodgerblue;
          border-radius: 1em;
        }
      }

      &.other {
        text-align: left;

        > div {
          width: fit-content;
          padding: 10px;
          background: #eaeaea;
          border-radius: 1em;
        }
      }
    }
  }
}

.date {
  font-weight: lighter;
  font-size: 12px;
  color: #a0a0a0;
}
</style>
