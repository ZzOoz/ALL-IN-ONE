<template>
  <div>
    <img :src="result && result.message" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "asyncShow",
  //   setup() {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         return resolve({
  //           result: 222,
  //         });
  //       }, 3000);
  //     });
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
      result: rawData.data,
    };
  },
});
</script>

<style>
</style>