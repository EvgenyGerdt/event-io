<template>
  <div class="friends-view__container">
    <div class="friends-view__search">
      <input
          v-model="searchField"
          class="friends-view__search-input"
          placeholder="Enter search field..."
      />
      <font-awesome-icon
          class="friends-view__search-icon"
          icon="magnifying-glass"
      />
    </div>

    <CardBox title="Users">
      <template #content>
        <Suspense>
          <template #default>
            <FriendList />
          </template>
          <template #fallback>
            <Loader />
          </template>
        </Suspense>
      </template>
    </CardBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

import { useFriends } from "@/stores/friends";
import useDebouncedRef from "@/hooks/useDebouncedRef";

import FriendList from "@/components/friends/FriendList.vue";
import CardBox from "@/components/CardBox.vue";
import Loader from "@/App.vue";

export default defineComponent({
  name: "FriendsView",

  components: {
    Loader,
    CardBox,
    FriendList,
  },

  setup() {
    const searchField = useDebouncedRef('', 1000, false);
    const friends = useFriends();

    watch(searchField, (newValue) => friends.findList(newValue));

    return {
      searchField,
    };
  },
});
</script>

<style lang="scss" scoped>
.friends-view {
  &__container {
    width: 35%;
    margin: 0 auto;

    text-align: center;
  }

  &__search {
    position: relative;
    margin-bottom: 20px;

    &-input {
      height: 40px;

      font-size: 18px;
      font-weight: bold;

      width: 100%;
      padding-left: 40px;

      border: none;
      border-radius: 15px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);

      transition: all .3s ease;

      &:focus {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
      }

      &:focus ~ svg {
        color: #a63aff;
      }
    }

    &-icon {
      position: absolute;
      left: 15px;
      top: 30%;

      transition: all .3s ease;

      color: #A0A0A0;
    }
  }
}
</style>
