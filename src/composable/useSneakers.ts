import { onMounted, reactive, ref, watch } from 'vue'

import type { SneakerItem } from '@/types/item'
import { fetchSneakersApi } from '@/api/sneakers'

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

      items.value = await fetchSneakersApi({
        sortBy: filters.sortBy,
        title: filters.searchQuery,
      })
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
