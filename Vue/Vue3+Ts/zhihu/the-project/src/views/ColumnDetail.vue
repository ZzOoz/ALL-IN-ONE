<template>
  <div>
    <!-- <pre>{{ route }}</pre> -->
    <div class="column-detail-page w-75 mx-auto">
      <div
        class="column-info row mb-4 border-bottom pb-4 align-items-center"
        v-if="column"
      >
        <div class="col-3 text-center">
          <img
            :src="column.avatar && column.avatar"
            :alt="column.title"
            class="rounded-circle border w-100"
          />
        </div>
        <div class="col-9">
          <h4>{{ column.title }}</h4>
          <p class="text-muted">{{ column.description }}</p>
        </div>
      </div>
      <PostList :list="post"></PostList>
    </div>
  </div>
</template>

<script lang='ts'>
// useRoute 是用来获取路由参数的 里面有该路由的参数
// useRouter 是用来获取整个路由对象 里面有跳转的方法
import { useRoute } from 'vue-router'
// import { testData, testPosts } from '@/testData'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalProps } from '@/store/main'
import PostList from '@/components/PostList.vue'
export default defineComponent({
  name: '',
  components: { PostList },
  props: {},
  setup () {
    const route = useRoute()
    const store = useStore<GlobalProps>()
    const currentId = +route.params.id
    console.log(store.getters, 'getters')
    const column = computed(() => store.getters.getColumnById(currentId))
    const post = computed(() => store.getters.getPostByCid(currentId))
    console.log(column, 'column')
    console.log(post, 'post')
    return {
      column,
      post
    }
  }
})
</script>

<style scoped lang="scss">
</style>
