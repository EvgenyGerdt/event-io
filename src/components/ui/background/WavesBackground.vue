<template>
  <svg-img class="waves" name="Waves" />
</template>

<script>
import SvgImg from "../svg-img.vue";
export default {
  name: "Waves",
  components: { SvgImg }
}
</script>

<style scoped>
.waves {
  position: absolute;
  bottom: 0;
  z-index: -1;
}
</style>
