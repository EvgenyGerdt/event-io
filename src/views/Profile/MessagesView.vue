<template>
  <div class="messages-layout__container">
    <CardBox title="Messages">
      <template #content>
        <div class="messages-layout__wrapper">
          <MessagesMenu :chats="cStore.chats" @select="selectChat" />
          <div class="messages-layout__content">
            <MessagesHeader
              v-if="id"
              :online="currentChat.online"
              :first-name="currentChat.firstName"
              :last-name="currentChat.lastName"
              :id="id"
            />
            <router-view :key="route.name" />
          </div>
        </div>
      </template>
    </CardBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChat } from "@/stores/chat";

import MessagesHeader from "@/components/messages/MessagesHeader.vue";
import MessagesMenu from "@/components/messages/MessagesMenu.vue";

import type { ComputedRef } from "vue";
import CardBox from "@/components/CardBox.vue";

export default defineComponent({
  name: "MessagesLayout",
  components: { CardBox, MessagesMenu, MessagesHeader },

  async setup() {
    const cStore = useChat();
    const route = useRoute();
    const router = useRouter();

    await cStore.getChats();

    const currentChat = computed(() => {
      const chat = cStore.chats.find((chat) => chat.userId === route.params.id);

      return {
        firstName: chat.firstName,
        lastName: chat.lastName,
        online: true,
      };
    });

    const id: ComputedRef<string> = computed(() => route.params.id as string);

    const selectChat = (chat) => {
      router.push({
        name: "Chat",
        params: { id: chat.userId },
      });
    };

    return {
      selectChat,
      id,
      currentChat,
      route,
      cStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.messages-layout {
  &__container {
    width: 35%;
    margin: 0 auto;
    text-align: center;
  }

  &__wrapper {
    position: relative;
    min-height: 600px;
  }

  &__content {
    position: absolute;
    right: 0;
    width: 70%;
    height: 95%;
  }
}
</style>
