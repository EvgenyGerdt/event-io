<template>
  <div class="messages-menu__list">
    <div class="messages-menu__list-search">
      <input placeholder="Search" v-model="searchField" type="text" />
      <font-awesome-icon icon="magnifying-glass" />
    </div>

    <div
      class="messages-menu__list-item"
      v-for="(chat, index) in filteredChats"
      :key="`${chat.userId}_${index}`"
      :class="{ selected: chat.userId === route.params.id }"
      @click="handleSelect(chat)"
    >
      <div class="messages-menu__list-item-avatar">
        {{ getEmptyAvatarInitials(chat) }}
      </div>

      <div class="messages-menu__list-item-body">
        <div class="messages-menu__list-item-body-personal">
          <span>{{ chat.firstName }}</span>
          <span>{{ chat.lastName }}</span>
        </div>

        <div class="messages-menu__list-item-body-last">
          <span>{{ chat.preview }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";

import type { Ref } from "vue";

export default defineComponent({
  name: "MessagesMenu",

  props: {
    chats: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["select"],

  setup(props, { emit }) {
    const searchField: Ref<string> = ref("");

    const route = useRoute();
    const getEmptyAvatarInitials = (chat) =>
      `${chat.firstName.charAt(0)}${chat.lastName.charAt(0)}`;

    const handleSelect = (chat: any) => emit("select", chat);

    const filteredChats = computed(() =>
      props.chats.filter((chat) => {
        const value = `${chat.firstName} ${chat.lastName}`;

        if (value.includes(searchField.value)) {
          return chat;
        }
      })
    );

    return {
      handleSelect,
      getEmptyAvatarInitials,
      route,
      filteredChats,
      searchField,
    };
  },
});
</script>

<style lang="scss" scoped>
.messages-menu {
  &__list {
    position: absolute;

    height: 100%;

    width: 30%;
    border-right: 1px solid #eaeaea;

    &-search {
      position: relative;

      > input {
        height: 35px;
        width: 100%;
        border: none;

        padding-left: 20px;

        border-bottom: 1px solid #eaeaea;
        transition: all 300ms ease;

        &:focus {
          border-bottom: 1px solid #a63aff;

          & ~ svg {
            color: #a63aff;
          }
        }
      }

      > svg {
        position: absolute;
        left: 3px;
        top: 10px;
        font-size: 12px;

        color: #a0a0a0;
        transition: all 300ms ease;
      }
    }

    &-item {
      display: flex;
      align-items: center;
      width: 100%;

      padding: 10px 5px;

      border-bottom: 1px solid #eaeaea;

      cursor: pointer;
      &:hover {
        background: #eeeeee;
      }

      &-avatar {
        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
        font-weight: bold;

        height: 45px;
        width: 45px;
        background: -webkit-linear-gradient(#3aacff, #d639ef);
        border-radius: 50%;

        margin-right: 10px;
      }

      &-body {
        text-align: left;

        &-personal {
          display: flex;
          justify-content: flex-start;
          font-weight: bold;

          margin-bottom: 10px;

          & > span:not(:last-child) {
            margin-right: 5px;
          }
        }

        &-last {
          opacity: 0.7;
          font-weight: lighter;
          white-space: nowrap;
          inline-size: 10px;
          overflow: hidden;
          width: 150px;
        }
      }
    }
  }
}

.selected {
  background: #f1f1f1;
}
</style>
