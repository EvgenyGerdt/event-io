<template>
  <div class="card">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "CardBox",

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 10px 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  text-align: left;

  margin-bottom: 10px;
}
</style>
