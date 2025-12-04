import { apiRequest } from '@/api/mokkyClient.ts'

export interface FavoriteItem {
  id: number
  itemId: number
}

export async function fetchFavoritesApi() {
  return apiRequest<FavoriteItem[]>('/favorites', {
    method: 'GET',
  })
}

export async function addFavoriteApi(itemId: number) {
  return apiRequest<FavoriteItem>('/favorites', {
    method: 'POST',
    body: {
      itemId,
    },
  })
}

export async function deleteFavoriteApi(favoriteId: number) {
  return apiRequest<void>(`/favorites/${favoriteId}`, {
    method: 'DELETE',
  })
}
