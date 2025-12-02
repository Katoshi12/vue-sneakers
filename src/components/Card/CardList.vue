<script setup lang="ts">
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Добавить!')
}
const onClickFavorite = () => {
  alert('Добавлено в избранное!')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские кроссовки Nike Blazer Mid Suede"
      :price="5000"
      :is-added="false"
      :is-favorite="false"
      :on-click-add="onClickAdd"
      :on-click-favorite="onClickFavorite"
    />
  </div>
</template>

<style scoped></style>
