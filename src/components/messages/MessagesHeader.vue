<template>
  <div class="messages-header__container">
    <div class="messages-header__info">
      <span>{{ firstName }} {{ lastName }}</span>
      <span :class="{ active: online }">
        {{ online ? "Online" : "Offline" }}
      </span>
    </div>

    <div class="messages-header__avatar">
      {{ emptyAvatarInitials }}
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "MessagesHeader",

  props: {
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

    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const emptyAvatarInitials = computed(
      () => `${props.firstName.charAt(0)}${props.lastName.charAt(0)}`
    );

    return {
      emptyAvatarInitials,
    };
  },
});
</script>

<style lang="scss" scoped>
.messages-header {
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 35px;
    border-bottom: 1px solid #eaeaea;

    padding: 0 10px;
  }

  &__info {
    > span:first-child {
      font-weight: bold;
    }

    > span:last-child {
      margin-left: 10px;
      font-size: 14px;
      font-weight: lighter;
    }
  }

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-weight: bold;

    height: 25px;
    width: 25px;
    background: -webkit-linear-gradient(#3aacff, #d639ef);
    border-radius: 50%;

    font-size: 12px;
    margin-right: 10px;
  }
}

.active {
  color: #4ca6ff;
}
</style>
