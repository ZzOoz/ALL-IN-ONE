<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnsList :list="testData"></ColumnsList>
  </div>
</template>

<script lang='ts'>
import ColumnsList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { GlobalProps } from '@/store/main'
export default {
  name: '',
  components: { ColumnsList },
  props: {},
  setup () {
    const store = useStore<GlobalProps>()
    const testData = computed(() => store.state.columns)

    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    return {
      testData
    }
  }
}
</script>

<style scoped lang="scss">
</style>
