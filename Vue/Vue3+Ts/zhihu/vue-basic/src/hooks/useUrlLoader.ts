import { ref } from 'vue'
import axios from 'axios'

function useUrlLoader<T>(url: string) {
    const result = ref<T | null>(null)
    const loading = ref(true)
    const loaded = ref(false)
    const error = ref(null)

    axios.get(url).then(rawData => {
        result.value = rawData.data
        loading.value = false
        loaded.value = true
    }).catch(e => {
        error.value = e
        loaded.value = true
    })

    return {
        result,
        loading,
        loaded,
        error
    }
}

export default useUrlLoader