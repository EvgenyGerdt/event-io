<template>
  <div class="event-item">
    <div class="event-item__main">
      <div class="event-item__main-avatar">
        {{ emptyAvatarInitials }}
      </div>
      <div class="event-item__main-info">
        <div class="event-item__main-info-name">
          {{ name }}
        </div>
        <div class="event-item__main-info-time">When: {{ date }}</div>
      </div>
    </div>

    <div class="event-item__controls">
      <font-awesome-icon
        class="event-item__controls-location"
        icon="location-dot"
      />
      <font-awesome-icon
        class="event-item__controls-angle"
        icon="angle-right"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "event-item",

  props: {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    geo: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const emptyAvatarInitials = computed(() => props.name.charAt(0));

    return {
      emptyAvatarInitials,
    };
  },
});
</script>

<style lang="scss" scoped>
.event-item {
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

      &-time {
        color: #a0a0a0;
        font-weight: lighter;
      }

      &-name,
      &-status {
        font-size: 16px;
      }
    }
  }

  &__controls {
    &-location {
      margin-right: 20px;
    }

    &-angle,
    &-location {
      color: #a0a0a0;
      transition: all 0.3s ease;

      font-size: 24px;

      &:hover {
        color: #3aacff;
      }
    }
  }
}
</style>
