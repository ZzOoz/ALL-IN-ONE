import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useDropDownClick = (elementRef: Ref<null | HTMLElement>) => {
  const isOutSideClick = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isOutSideClick.value = false
      } else {
        isOutSideClick.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isOutSideClick
}

export default useDropDownClick
