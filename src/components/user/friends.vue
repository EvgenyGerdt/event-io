<template>
  <div class="friends-list">
    <friend-item
        class="friends-list__item"
        v-for="friend in friends"
        :id="friend.id"
        :first-name="friend.firstName"
        :last-name="friend.lastName"
        :online="friend.online"
        :key="`${friend.id}_${friend.firstName}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FriendItem from "@/components/user/friends/friend-item.vue";

export default defineComponent({
  name: "friends",
  components: {FriendItem},
  setup() {
    const friends: any[] = [
      {
        id: 1,
        firstName: "Test",
        lastName: "Item",
        online: true,
      },
      {
        id: 2,
        firstName: "Test",
        lastName: "Item",
        online: false,
      },
      {
        id: 3,
        firstName: "Test",
        lastName: "Item",
        online: true,
      },
      {
        id: 4,
        firstName: "Test",
        lastName: "Item",
        online: false,
      },
    ];

    return {
      friends,
    }
  },
});
</script>

<style lang="scss" scoped>
.friends-list {
  &__item {
    margin: 12px 0;
  }
}
</style>
