import type { SneakerItem } from '@/types/item'
import { apiRequest } from './mokkyClient'

export interface SneakersQueryParams {
  sortBy?: string
  title?: string
}

export function fetchSneakersApi(params?: SneakersQueryParams) {
  const query: Record<string, string | number> = {}

  if (params?.sortBy) {
    query.sortBy = params.sortBy
  }

  if (params?.title) {
    query.title = params.title
  }

  return apiRequest<SneakerItem[]>('/items', {
    params: query,
  })
}
