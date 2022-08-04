<template>
  <div class="profile-view__container" v-if="user">
    <div class="profile-view__header">
      <div class="profile-view__header-avatar">
        {{ emptyAvatarInitials }}
      </div>

      <span class="profile-view__header-name">
        {{ user.firstName }} {{ user.lastName }}
      </span>

      <div
          class="profile-view__header-status"
          :class="{ online: user.online }"
      >
        {{ user.online ? 'Online' : 'Offline' }}
      </div>
    </div>

    <div class="profile-view__main">
<!--      <div class="profile-view__preferences">-->
<!--        <card-box title="Preferences">-->
<!--          <template #content>-->

<!--          </template>-->
<!--        </card-box>-->
<!--      </div>-->
      <div class="profile-view__main-bottom">
        <div class="profile-view__main-bottom-events">
          <card-box class="profile-view__main-bottom-card" title="Events">
            <template #content>
              <Events />
            </template>
          </card-box>
        </div>
        <div class="profile-view__main-bottom-friends">
          <card-box class="profile-view__main-bottom-card" title="Friends">
            <template #content>
              <Friends />
            </template>
          </card-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProfile } from "@/stores/profile";

import type { User } from "@/types/User";

import HeaderMenu from "@/layouts/HeaderMenu.vue";
import CardBox from "@/components/CardBox.vue";

import Friends from "@/components/user/friends.vue";
import Events from "@/components/user/events.vue";

export default defineComponent({
  name: "ProfileView",

  components: {
    HeaderMenu,
    CardBox,
    Friends,
    Events,
  },

  async setup() {
    const profile = useProfile();
    const user: User = await profile.loadProfile() as User;

    const emptyAvatarInitials = computed(() => `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`);


    return {
      emptyAvatarInitials,
      user,
    };
  },
})
</script>

<style lang="scss" scoped>
.profile-view {
  &__container {
    height: 100%;
    width: 100%;

    text-align: center;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-bottom: 20px;

    &-avatar {
      width: 165px;
      height: 165px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 64px;
      font-weight: bold;

      color: white;

      background: -webkit-linear-gradient(0.45turn, #3AACFF, #D639EF);
      border-radius: 50%;

      margin-bottom: 10px;
      user-select: none;
    }

    &-name {
      font-weight: bold;
      font-size: 38px;
      margin-bottom: 15px;
    }

    &-status {
      font-size: 18px;
      color: #A0A0A0;
    }

    &-status.online {
      color: #3AACFF;
    }
  }

  &__main {
    width: 40%;
    margin: 0 auto;

    &-bottom {
      width: 100%;
      display: flex;

      &-events {
        flex: 2;
        margin-right: 10px;
        max-width: 550px;
      }

      &-friends {
        flex: 1;
      }

      &-card {
        height: 250px;
      }
    }
  }
}
</style>
