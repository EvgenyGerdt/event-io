<template>
  <template v-if="showFriendsAndRequests">
    <div class="friend-list__requests" v-if="showRequests">
      <span class="friend-list__block-title">Friendship requests</span>
      <hr />
      <FriendListItem
          class="friend-list__item"
          v-for="request in fStore.requests"
          :id="request.id"
          :online="request.online"
          :last-name="request.lastName"
          :first-name="request.firstName"
          :request-id="request.requestId"
          request
      />
    </div>

    <div class="friend-list__friends" v-if="showFriends">
      <span class="friend-list__block-title">Friends</span>
      <hr />
      <FriendListItem
          class="friend-list__item"
          v-for="(friend, index) in fStore.friends"
          :id="friend.id"
          :online="friend.online"
          :last-name="friend.lastName"
          :first-name="friend.firstName"
          :key="`${friend.id}_${index}`"
          has-friendship
      />
    </div>
  </template>

  <div class="friend-list__users" v-else-if="showUsers">
    <span class="friend-list__block-title">Other users</span>
    <hr />
    <FriendListItem
        class="friend-list__item"
        v-for="user in fStore.users"
        :id="user.id"
        :online="user.online"
        :last-name="user.lastName"
        :first-name="user.firstName"
    />
  </div>

  <div class="friend-list__empty" v-else>
    <font-awesome-icon class="friend-list__empty-text-colored icon" icon="face-frown" />

    <div class="friend-list__empty-text">
      <p>The friends list is empty. But everything is still ahead!</p>
      <p class="friend-list__empty-text-colored">Use search and find your friend now!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useFriends } from "@/stores/friends";
import useTransitionEffects from "@/hooks/useTransitionEffects";

import FriendListItem from "@/components/friends/FriendList-Item.vue";

export default defineComponent({
  name: "friend-list",

  components: {
    FriendListItem,
  },

  async setup() {
    const { onLeave, onBeforeEnter, onEnter } = useTransitionEffects();

    const fStore = useFriends();
    await fStore.getFriendList();
    await fStore.getRequests();

    const showFriendsAndRequests = computed(() =>
        (fStore.friends.length !== 0 ||
        fStore.requests.length !== 0) &&
        fStore.users.length === 0
    );

    const showRequests = computed(() => fStore.requests.length !== 0);
    const showFriends = computed(() => fStore.friends.length !== 0);

    const showUsers = computed(() => fStore.users.length !== 0);

    return {
      fStore,
      showFriendsAndRequests,
      showRequests,
      showFriends,
      showUsers,

      onLeave,
      onBeforeEnter,
      onEnter,
    };
  },
})
</script>

<style lang="scss" scoped>
.friend-list {
  &__requests {
    margin-bottom: 15px;
  }

  &__block {
    &-title {
      display: flex;
      color: #A0A0A0;
    }
  }

  &__item:not(:last-child) {
    margin-bottom: 15px;
  }

  &__empty {
    min-height: 350px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    &-text {
      &-colored {
        animation: switch-color 5s ease infinite;
      }

      &-colored.icon {
        font-size: 60px;
      }
    }
  }
}

hr {
  border: 0;
  border-top: 1px solid #A0A0A0;
  opacity: 0.5;
  margin-bottom: 10px;
}

@keyframes switch-color {
  0% {
    color: #3AACFF;
  }

  25% {
    color: #a63aff;
  }

  50% {
    color: #D639EF;
  }

  75% {
    color: #a63aff;
  }

  100% {
    color: #3AACFF;
  }
}
</style>
