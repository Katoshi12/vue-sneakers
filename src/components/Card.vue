<script setup lang="ts">
interface CardProps {
  title: string
  imageUrl: string
  price: number
  isFavorite: boolean
  isAdded: boolean
  onClickAdd: () => void
  onClickFavorite: () => void
}

defineProps<CardProps>()
</script>

<template>
  <article
    class="relative bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      @click="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Favorite Like"
      class="absolute top-8 left-8"
    />

    <img :src="imageUrl" alt="Sneaker" />

    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена</span>
        <b>{{ price }} руб.</b>
      </div>

      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </article>
</template>

<style scoped></style>
