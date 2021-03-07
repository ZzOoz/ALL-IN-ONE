<template>
  <div class="container">
    <global-header :user="currentUser" />
    <router-view />
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { GlobalProps } from '@/store/main'

export default {
  name: 'App',
  components: { GlobalHeader },
  setup () {
    const store = useStore<GlobalProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
}
</script>
