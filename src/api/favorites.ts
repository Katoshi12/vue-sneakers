import { apiRequest } from '@/api/mokkyClient.ts'

export async function addFavoriteApi(id: number) {
  return apiRequest<number>('/favorites', {
    method: 'POST',
    body: {
      id,
    },
  })
}
