import { ref } from 'vue'
import axios from 'axios'

export function useApiFetch(initialUrl = '', options = {}) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const config = {
    method: 'get',
    ...options,
  }

  const fetchData = async (url = initialUrl) => {
    if (!url) {
      console.warn('useApiFetch: No URL provided')
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await axios({ url, ...config })
      data.value = response.data
    } catch (err) {
      error.value = err.message || 'Failed to fetch data'
      console.error('API Error:', err)
    } finally {
      loading.value = false
    }
  }


  return { data, loading, error, fetchData }
}
