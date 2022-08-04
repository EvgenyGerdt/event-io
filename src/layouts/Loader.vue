<template>
  <div class="loader">
    <font-awesome-icon class="loader-icon" icon="heart" />
    <p>Loading your beautiful data :)</p>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.loader {
  height: 55vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
}

.loader-icon {
  font-size: 70px;
  animation: 2s heartbeat ease-out infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(0.9);
    color: #ac46ff;
  }

  25% {
    transform: scale(1.1);
    color: #4ca6ff;
  }

  50% {
    transform: scale(0.9);
    color: #9e33ff;
  }

  75% {
    transform: scale(1.1);
    color: #4ca6ff;
  }

  100% {
    transform: scale(0.9);
    color: #ac46ff;
  }
}
</style>
