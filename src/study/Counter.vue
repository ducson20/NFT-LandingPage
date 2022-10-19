<script setup lang="ts">
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onBeforeUpdate,
  onUpdated,
  computed,
  watch,
  watchEffect,
} from "vue";
onBeforeMount(() => {
  console.log("beforeMount child");
});

onMounted(() => {
  console.log("mounted child");
});

onUnmounted(() => {
  console.log("unMounted child");
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate child");
});

onUpdated(() => {
  console.log("onUpdated child");
});
</script>
<template>
  <h1>Detail Page</h1>
</template>

<style lang="scss"></style>
