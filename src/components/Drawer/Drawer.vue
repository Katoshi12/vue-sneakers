<script setup lang="ts">
import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
import CartListItem from '@/components/Cart/CartListItem.vue'
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" />
  <aside class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-auto">
    <DrawerHeader />

    <CartListItem />

    <div class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Итого: </span>
        <div class="flex-1 border-b border-dashed" />
        <b>12900 руб.</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%: </span>
        <div class="flex-1 border-b border-dashed" />
        <b>900 руб.</b>
      </div>
      <button
        disabled
        class="mt-4 cursor-pointer bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-400 hover:bg-lime-600 transition active:bg-lime-700"
      >
        Оформить заказ
      </button>
    </div>
  </aside>
</template>

<style scoped></style>
