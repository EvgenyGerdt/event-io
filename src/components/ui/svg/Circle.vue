<template>
  <svg :width="width" :height="height" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="42.5" cy="42.5" r="42.5" fill="url(#paint0_linear_1_14)"/>
    <defs>
      <linearGradient id="paint0_linear_1_14" x1="29" y1="-60" x2="57" y2="139" gradientUnits="userSpaceOnUse">
        <stop stop-color="#D639EF"/>
        <stop offset="1" stop-color="#3AACFF"/>
      </linearGradient>
    </defs>
  </svg>

</template>

<script>
export default {
  name: "Circle",

  props: {
    height: {
      type: String,
      default: "0",
    },

    width: {
      type: String,
      default: "0",
    }
  }
}
</script>
