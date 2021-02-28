<template>
  <div>
    <div>{{ count }}</div>
    <div>{{ double }}</div>
    <button @click="increase">+1</button>
    <div>X:{{ x }}</div>
    <div>Y:{{ y }}</div>
    <button @click="updateTitle">updateTitle</button>

    <div>报错：{{ error }}</div>
    <Suspense>
      <template #default>
        <asyncShow />
        <!-- suspense可以同时加载多个异步组件 -->
      </template>
      <template #fallback>
        <h1>加载中 ...</h1>
      </template>
    </Suspense>

    <modal :isOpen="isOpen" @close-modal="closeModal"> 打开modal </modal>
    <button @click="openModal">打开modal</button>
    <!-- useUrlLoader -->
    <div v-if="loading">...loading</div>
    <img v-if="loaded" :src="result.message" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  toRefs,
  ref,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
} from "vue";
import useMouseEvent from "../hooks/useMouseClick";
import useUrlLoader from "../hooks/useUrlLoader";
import modal from "../components/modal.vue";
import asyncShow from "../components/asyncShow.vue";
// 数据接口约束
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

// 网络请求dog api 数据约束
interface DogResult {
  message: string;
  status: string;
}
export default {
  name: "App",
  components: { modal, asyncShow },
  // setup() {
  //   // setup方法实在生命周期之前执行的，所以不能用this来访问
  //   // 使用ref生成一个响应式数据
  //   // 通过ref可以直接在html中用count展示而不是用count.value
  //   const count = ref(0);
  //   // computed属性用来对响应式数据进行计算
  //   const double = computed(() => {
  //     return count.value * 2;
  //   });
  //   // 定义一个方法increase来对count进行加1
  //   const increase = () => {
  //     count.value++;
  //   };
  //   // 导出数据变量和方法
  //   return {
  //     count,
  //     increase,
  //     double
  //   };
  // },
  setup() {
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
    });
    // vue3中的生命周期
    onMounted(() => {
      console.log("mounted");
    });
    onUpdated(() => {
      console.log("updated");
    });

    onRenderTracked(() => {
      console.log("rednerTracked");
    });

    // debug的生命周期
    onRenderTriggered((event) => {
      console.log(event);
      console.log("renderTrigger");
    });

    const title = ref("");
    const { x, y } = useMouseEvent();
    const isOpen = ref(false);
    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
    };
    // useUrlLoader
    const { result, loading, loaded } = useUrlLoader<DogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );

    // 使用泛型约束后可以result.value.message显示
    watch(result, () => {
      if (result.value) {
        console.log(result.value.message, "message");
      }
    });

    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => {
        data.count++;
      },
      updateTitle: () => {
        title.value = "hello title";
      },
    });
    // watch的使用方法
    // watch的第一个参数可以接受多个响应式数据，比如[title,()=>data.count],这里的data.count需要使用箭头函数包裹，不然无法触发响应式
    watch([title, () => data.count], (newValue, oldValue) => {
      document.title = title.value;
      console.log(newValue, "newValue"); // ["",0]
      console.log(oldValue, "oldValue"); // ["",1]
    });

    return {
      // 当使用reactive的时候，如果不调用toRef的话，展开data的属性会使得data的各个属性都不再响应式
      ...toRefs(data),
      x,
      y,
      result,
      loading,
      loaded,
      isOpen,
      openModal,
      closeModal,
      error,
    };
  },
};
</script>

<style>
</style>
