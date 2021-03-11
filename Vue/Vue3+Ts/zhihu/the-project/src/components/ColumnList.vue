<template>
  <div class="row">
    <div v-for="column in columnsList" :key="column.id" class="col-4">
      <div class="card h-100 shadow-sm" style="width: 18rem">
        <div class="card-body text-center">
          <img
            :src="column.avatar.url"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">
            {{ column.description }}
          </p>
          <router-link :to="{name:'column',params:{id:column.id}}" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'
export default defineComponent({
  name: 'ColumnList',
  props: {
    // 当需要对数组的构造函数进行类型约束时需要用PropType，他接受一个泛型作为约束
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnsList = computed(() => {
      return props.list.map((column: ColumnProps) => {
        if (!column.avatar) {
          column.avatar = {
            url: require('@/assets/logo.png')
          }
        }
        return column
      })
    })
    return {
      columnsList
    }
  }
})
</script>

<style>
</style>
