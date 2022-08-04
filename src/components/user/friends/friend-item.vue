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
        <div
            class="friend-item__main-info-status"
            :class="{ online: online }"
        >
          {{ online ? 'Online' : 'Offline' }}
        </div>
      </div>
    </div>
    <router-view to="/">
      <font-awesome-icon class="friend-item__chat" icon="message" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "friend-item",

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
  },

  setup(props) {
    const emptyAvatarInitials = computed(() => `${props.firstName.charAt(0)}${props.lastName.charAt(0)}`);

    return {
      emptyAvatarInitials,
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

  transition: all .3s ease;

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
      background: -webkit-linear-gradient(#3AACFF, #D639EF);
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
        color: #A0A0A0;
        font-weight: lighter;
      }

      &-status.online {
        color: #3AACFF;
      }

      &-name, &-status {
        font-size: 16px;
      }
    }
  }

  &__chat {
    color: #A0A0A0;
    transition: all .3s ease;

    &:hover {
      color: #3AACFF;
    }
  }
}
</style>
