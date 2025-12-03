import { onMounted, reactive, ref, watch } from 'vue'

import type { SneakerItem } from '@/types/item.ts'

const API_URL = 'https://b13eae266db1e8e5.mokky.dev/items'

export function useSneakers() {
  const items = ref<SneakerItem[]>([])
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const filters = reactive({
    searchQuery: '',
    sortBy: 'name',
  })

  const fetchSneakers = async () => {
    try {
      isLoading.value = true
      errorMessage.value = null

      const url = new URL(API_URL)

      if (filters.sortBy) {
        url.searchParams.set('sortBy', filters.sortBy)
      }

      if (filters.searchQuery) {
        url.searchParams.set('title', filters.searchQuery)
      }

      const response = await fetch(url.toString())
      const data = await response.json()

      items.value = data as SneakerItem[]
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Не удалось загрузить список кроссовок'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchSneakers)
  watch(filters, fetchSneakers)

  return {
    items,
    filters,
    isLoading,
    errorMessage,
    fetchSneakers,
  }
}
