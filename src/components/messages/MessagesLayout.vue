<template>
  <div class="messages-layout__container">
    <MessagesHeader
      v-if="id"
      :online="currentChat.online"
      :first-name="currentChat.firstName"
      :last-name="currentChat.lastName"
      :id="id"
    />
    <MessagesMenu :chats="[]" />
    <MessagesBox :messages="[]" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

import MessagesHeader from "@/components/messages/MessagesHeader.vue";
import MessagesMenu from "@/components/messages/MessagesMenu.vue";
import MessagesBox from "@/components/messages/MessagesBox.vue";

import type { ComputedRef } from "vue";

export default defineComponent({
  name: "MessagesLayout",
  components: { MessagesBox, MessagesMenu, MessagesHeader },

  setup() {
    const route = useRoute();

    const currentChat = ref({
      firstName: "",
      lastName: "",
      online: false,
    });

    const id: ComputedRef<string> = computed(() => route.params.id as string);

    return {
      id,
      currentChat,
      route,
    };
  },
});
</script>

<style lang="scss" scoped></style>
