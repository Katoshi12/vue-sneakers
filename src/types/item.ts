export interface SneakerItem {
  id: number
  title: string
  price: number
  imageUrl: string

  isFavorite?: boolean
  favoriteId?: number | null
}
