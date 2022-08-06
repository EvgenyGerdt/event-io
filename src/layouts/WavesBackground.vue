<template>
  <svg-img class="waves" name="Waves" />
</template>

<script>
import SvgImg from "../components/ui/svg-img.vue";

export default {
  name: "WavesBackground",
  components: { SvgImg },
};
</script>

<style scoped>
.waves {
  position: absolute;
  bottom: 0;
  z-index: -1;

  height: 400px;
}
</style>
