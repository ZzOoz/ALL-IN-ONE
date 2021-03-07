<template>
  <div>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          v-model="titleVal"
          placeholder="请输入文章标题"
          :rules="titleRules"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { PostProps } from '@/testData'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: '',
  components: { ValidateForm, ValidateInput },
  props: {},
  setup () {
    const store = useStore()
    const router = useRouter()
    const titleVal = ref('')
    const contentVal = ref('')

    const titleRules: RulesProps = [
      { type: 'required', message: '该字段必填' }
    ]

    const contentRules: RulesProps = [
      { type: 'required', message: '该字段必填' }
    ]

    const onFormSubmit = (result: boolean) => {
      console.log('111')
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createAt: new Date().toDateString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
}
</script>

<style scoped lang="scss">
</style>
