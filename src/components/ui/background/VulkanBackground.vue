<template>
  <svg-img class="circle cr-1" name="Circle" height="100" width="100"/>
  <svg-img class="circle cr-2" name="Circle" height="20" width="20"/>
  <svg-img class="circle cr-3" name="Circle" height="65" width="65"/>
  <svg-img class="circle cr-4" name="Circle" height="60" width="60"/>
  <svg-img class="circle cr-5" name="Circle" height="20" width="20"/>
  <svg-img class="circle cr-6" name="Circle" height="20" width="20"/>
  <svg-img class="circle cr-7" name="Circle" height="20" width="20"/>
  <svg-img class="circle cr-8" name="Circle" height="15" width="15"/>
  <svg-img class="circle cr-9" name="Circle" height="55" width="55"/>
  <svg-img class="circle cr-10" name="Circle" height="45" width="45"/>
  <svg-img class="vulkan" name="Vulkan"/>
</template>

<script>
import SvgImg from "@/components/ui/svg-img.vue";

export default {
  name: "VulkanBackground",
  components: { SvgImg },
}
</script>

<style scoped>
.vulkan {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.circle {
  position: absolute;
}

.cr-1 {
  top: 45%;
  left: 15%;
  animation: 2s fly-1 infinite;
}

.cr-2 {
  top: 43%;
  left: 19%;
  animation: 2s fly-2 infinite;
}

.cr-3 {
  top: 40%;
  left: 21%;
  animation: 2s fly-1 infinite;
}

.cr-4 {
  top: 37%;
  left: 16%;
  animation: 2s fly-2 infinite;
}

.cr-5 {
  top: 37%;
  left: 22%;
  animation: 2s fly-2 infinite;
}

.cr-6 {
  top: 38%;
  left: 20%;
  animation: 2s fly-2 infinite;
}

.cr-7 {
  top: 34%;
  left: 17%;
  animation: 2s fly-2 infinite;
}

.cr-8 {
  top: 26%;
  left: 17%;
  animation: 2s fly-2 infinite;
}

.cr-9 {
  top: 32%;
  left: 20%;
  animation: 2s fly-1 infinite;
}

.cr-10 {
  top: 29%;
  left: 17%;
  animation: 2s fly-2 infinite;
}

@keyframes fly-1 {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes fly-2 {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(15px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
