<script setup lang="ts">
import Header from '@/components/Header.vue'
import CardList from '@/components/CardList.vue'
</script>

<template>
  <main class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-15">
    <Header />

    <section class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

      <CardList />
    </section>
  </main>
</template>

<style scoped></style>
