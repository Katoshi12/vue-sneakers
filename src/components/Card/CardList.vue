<script setup lang="ts">
import { ref } from 'vue'

import Card from './Card.vue'
import type { SneakerItem } from '@/types/item.ts'
import { addFavoriteApi } from '@/api/favorites.ts'

const { items } = defineProps<{ items: SneakerItem[] }>()

const favorites = ref<number[]>([])

const isItemFavorite = (itemId: number): boolean => {
  return favorites.value.includes(itemId)
}

const onClickAdd = () => {
  // логика добавления в корзину
}

const onClickFavorite = async (item: SneakerItem) => {
  const alreadyFavorite = isItemFavorite(item.id)

  try {
    if (!alreadyFavorite) {
      await addFavoriteApi(item.id)
      favorites.value.push(item.id)
    } else {
      favorites.value = favorites.value.filter(id => id !== item.id)
    }
  } catch (error) {
    console.error('Не удалось обновить избранное', error)
  }
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="false"
      :is-favorite="isItemFavorite(item.id)"
      :on-click-add="() => onClickAdd(item)"
      :on-click-favorite="() => onClickFavorite(item)"
    />
  </div>
</template>

<style scoped></style>
