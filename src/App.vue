<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { SneakerItem } from '@/types/item.ts'
import Header from '@/components/Header.vue'
import CardList from '@/components/Card/CardList.vue'

const items = ref<SneakerItem[]>([])

onMounted(() => {
  fetch('https://b13eae266db1e8e5.mokky.dev/items')
    .then(res => res.json())
    .then(data => {
      items.value = data as SneakerItem[]
    })
})
</script>

<template>
  <main class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-15">
    <Header />

    <section class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex justify-between gap-4">
          <select class="py-2 px-3 border border-gray-200 rounded-md outline-none">
            <option>По названию</option>
            <option>По цене(дешевые)</option>
            <option>По цене(дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="Search" />
            <input
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <div class="mt-10">
        <CardList :items="items" />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
