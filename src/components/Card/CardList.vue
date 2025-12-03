<script setup lang="ts">
import Card from './Card.vue'
import type { SneakerItem } from '@/types/item.ts'

const { items } = defineProps<{ items: SneakerItem[] }>()

const onClickAdd = () => {
  // Логика добавления(чуть позже)
}
const onClickFavorite = () => {
  // Логика добавления(чуть позже)
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
      :is-favorite="false"
      :on-click-add="onClickAdd"
      :on-click-favorite="onClickFavorite"
    />
  </div>
</template>

<style scoped></style>
