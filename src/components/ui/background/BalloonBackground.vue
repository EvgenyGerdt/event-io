<template>
  <svg-img class="balloon" name="Balloon" />
</template>

<script>
import SvgImg from "../svg-img.vue";
export default {
  name: "BalloonBackground",
  components: { SvgImg }
}
</script>

<style scoped>
.balloon {
  position: absolute;
  right: 25%;
  top: 30%;

  animation: 2s fly ease-in-out infinite;
  z-index: 1;
}

@keyframes fly {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}
</style>
