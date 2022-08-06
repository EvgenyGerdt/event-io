<template>
  <div class="friend-item">
    <div class="friend-item__main">
      <div class="friend-item__main-avatar">
        {{ emptyAvatarInitials }}
      </div>
      <div class="friend-item__main-info">
        <div class="friend-item__main-info-name">
          {{ firstName }} {{ lastName }}
        </div>
        <div class="friend-item__main-info-time">
          {{ online ? "Online" : "Offline" }}
        </div>
      </div>
    </div>

    <div class="friend-item__controls" v-if="!request && hasFriendship">
      <font-awesome-icon
        class="friend-item__controls-message"
        icon="message"
        @click="enterToChat"
      />
    </div>

    <div class="friend-item__controls" v-if="!request && !hasFriendship">
      <font-awesome-icon
        class="friend-item__controls-request"
        icon="user-plus"
        @click="friends.sendFriendshipRequest(id)"
      />

      <font-awesome-icon
        class="friend-item__controls-message"
        icon="message"
        @click="enterToChat"
      />
    </div>

    <div class="friend-item__controls" v-if="request && !hasFriendship">
      <span
        class="friend-item__controls-request"
        @click="friends.acceptFriendRequest(requestId)"
      >
        <font-awesome-icon icon="user-plus" />
        Accept
      </span>
      <span
        class="friend-item__controls-request"
        @click="friends.declineFriendRequest(requestId)"
      >
        <font-awesome-icon icon="user-minus" />
        Decline
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

import { useFriends } from "@/stores/friends";

export default defineComponent({
  name: "FriendList-Item",

  props: {
    id: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    online: {
      type: Boolean,
      required: true,
    },

    requestId: {
      type: String,
      default: "",
    },

    request: {
      type: Boolean,
      default: false,
    },

    hasFriendship: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const friends = useFriends();
    const emptyAvatarInitials = computed(
      () => `${props.firstName.charAt(0)}${props.lastName.charAt(0)}`
    );

    const enterToChat = () =>
      router.push({ name: "Chat", params: { id: props.id } });

    return {
      friends,
      emptyAvatarInitials,
      enterToChat,
    };
  },
});
</script>

<style lang="scss" scoped>
.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  user-select: none;

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  &__main {
    display: flex;
    align-items: center;

    &-avatar {
      display: flex;
      justify-content: center;
      align-items: center;

      color: white;
      font-weight: bold;

      height: 40px;
      width: 40px;
      background: -webkit-linear-gradient(#3aacff, #d639ef);
      border-radius: 50%;

      margin-right: 5px;
    }

    &-info {
      display: flex;
      flex-direction: column;
      text-align: left;

      &-name {
        font-weight: bold;
      }

      &-status {
        color: #a0a0a0;
        font-weight: lighter;
      }

      &-status.online {
        color: #3aacff;
      }

      &-name,
      &-status {
        font-size: 16px;
      }
    }
  }

  &__controls {
    &-message,
    &-request {
      color: #a0a0a0;
      transition: all 0.3s ease;

      font-size: 20px;
      margin-left: 10px;

      &:hover {
        color: #3aacff;
      }
    }
  }
}
</style>
