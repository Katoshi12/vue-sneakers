import { onMounted, reactive, ref, watch } from 'vue'
import type { SneakerItem } from '@/types/item'
import { fetchSneakersApi } from '@/api/sneakers'
import { addFavoriteApi, deleteFavoriteApi, fetchFavoritesApi } from '@/api/favorites'

export function useSneakers() {
  const items = ref<SneakerItem[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const filters = reactive({
    searchQuery: '',
    sortBy: 'name',
  })

  const fetchSneakers = async () => {
    try {
      isLoading.value = true
      errorMessage.value = null

      const [sneakers, favorites] = await Promise.all([
        fetchSneakersApi({
          sortBy: filters.sortBy,
          title: filters.searchQuery,
        }),
        fetchFavoritesApi(),
      ])

      items.value = sneakers.map(item => {
        const favorite = favorites.find(fav => fav.itemId === item.id)

        return {
          ...item,
          isFavorite: !!favorite,
          favoriteId: favorite ? favorite.id : null,
        }
      })
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Не удалось загрузить список кроссовок'
    } finally {
      isLoading.value = false
    }
  }

  const toggleFavorite = async (item: SneakerItem) => {
    try {
      if (!item.isFavorite) {
        const favorite = await addFavoriteApi(item.id)

        items.value = items.value.map(sneaker =>
          sneaker.id === item.id
            ? { ...sneaker, isFavorite: true, favoriteId: favorite.id }
            : sneaker,
        )

        return
      }

      if (item.isFavorite && item.favoriteId != null) {
        await deleteFavoriteApi(item.favoriteId)

        items.value = items.value.map(sneaker =>
          sneaker.id === item.id ? { ...sneaker, isFavorite: false, favoriteId: null } : sneaker,
        )
      }
    } catch (error) {
      console.error('Не удалось обновить избранное', error)
      errorMessage.value = 'Ошибка при обновлении избранного'
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
    toggleFavorite,
  }
}
