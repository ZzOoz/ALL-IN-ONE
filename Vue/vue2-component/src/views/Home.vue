<template>
  <div class="home">
    <!-- 带输入建议的输入框 -->
    <autoComplete />
  </div>
</template>

<script>
// @ is an alias to /src
import autoComplete from "@/components/autoComplete.vue";
export default {
  name: "Home",
  components: {
    autoComplete,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
