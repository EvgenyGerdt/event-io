<template>
  <div class="events-list">
    <event-item
        class="events-list__item"
        v-for="event in events"
        :id="event.id"
        :geo="event.geo"
        :date="event.date"
        :name="event.name"
        :key="`${event.id}_${event.name}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EventItem from "@/components/user/events/event-item.vue";

export default defineComponent({
  name: "events",

  components: {
    EventItem,
  },

  setup() {
    const events: any[] = [
      {
        id: 1,
        name: "Test Party",
        date: "13.08.2019",
        geo: "Moscow",
      },
      {
        id: 2,
        name: "Test Party",
        date: "13.08.2019",
        geo: "Moscow",
      },
      {
        id: 3,
        name: "Test Party",
        date: "13.08.2019",
        geo: "Moscow",
      },
      {
        id: 4,
        name: "Test Party",
        date: "13.08.2019",
        geo: "Moscow",
      },
    ];

    return {
      events,
    };
  },
});
</script>

<style lang="scss" scoped>
.events-list {
  &__item {
    margin: 12px 0;
  }
}
</style>
