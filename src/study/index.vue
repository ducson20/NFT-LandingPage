<script setup lang="ts">
import Counter from "./Counter.vue";
import GButton from "@/components/base/GButton.vue";
import router from "@/router/";
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

console.log("Counter Component");

const counter = ref<number>(0);
const inputVal = ref<string>("");

const user: any = reactive({
  lastName: "",
  fullName: "",
});

const handleCount = () => {
  // console.log("Click");
  counter.value += 1;
};

const countMethod = () => {
  // console.log("Method");
  return `Counter ${counter.value}`;
};

const userArr = [
  {
    id: "key1",
    value: "Son",
  },
  {
    id: "key2",
    value: "Phuc",
  },
  {
    id: "key3",
    value: "Long",
  },
  {
    id: "key4",
    value: "Nhan",
  },
];


// Clone array to object by reduce reduce
const cloneObject = userArr.reduce((itemMap: any, item: any) => {
  itemMap[item.id] = item.value;
  return itemMap;
}, {});
// console.log("Clone object: ", cloneObject);

// Find max number by reduce
const findMaxReduce = (arr: number[]) => {
  const result = arr.reduce((max: any, number) => {
    return max > number ? max : number;
  }, 0);
  console.log(result);
  return result;
};
// findMaxReduce([2, 3, 1, 6, 7, 4]);

const cloneObjToArr = (obj: any) => {
  const arr = [];
  for (const o in obj) {
    arr.push(o);
  }
  console.log("ARR: ", arr);
  return arr;
};

cloneObjToArr({ ...cloneObject });

onBeforeMount(() => {
  console.log("beforeMount");
});

onMounted(() => {
  console.log("mounted");
});

onUnmounted(() => {
  console.log("unMounted");
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});

onUpdated(() => {
  console.log("onUpdated");
});

const countComputed = computed<string>(() => {
  return `Counter ${counter.value}`;
});

watch(inputVal, (newVal, oldVal) => {
  console.log("Watch");
  if (newVal === "son") {
    console.log("Watch change");
    counter.value += 10;
  }
});

watchEffect(() => {
  console.log("Watch Effect", inputVal.value, counter.value);
  if (inputVal.value === "son") {
    console.log("Watch Effect Change");
    counter.value += 1;
  }
});
</script>
<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>{{ `Method: ${countMethod()}` }}</h1>
    <h1>{{ `Computed: ${countComputed}` }}</h1>
    <GButton buttonType="danger" @click="handleCount">Counter</GButton>
    <input type="text" v-model="inputVal" />
    <h1>{{ inputVal }}</h1>
    <Counter></Counter>
  </div>
</template>

<style lang="scss"></style>
