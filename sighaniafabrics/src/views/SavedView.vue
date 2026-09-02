<script setup>
import { computed } from 'vue'
import FabricCard from '../components/FabricCard.vue'
import { fabricById } from '../data/catalog.js'
import { store, go } from '../store.js'

const list = computed(() => store.saved.map(fabricById).filter(Boolean))
</script>

<template>
  <div class="shell page">
    <header class="top">
      <h1>Shortlist</h1>
      <p class="meta">{{ list.length }} kept for later</p>
    </header>

    <div v-if="list.length" class="grid">
      <FabricCard v-for="f in list" :key="f.id" :fabric="f" />
    </div>
    <div v-else class="empty">
      <h3>Nothing shortlisted yet</h3>
      <p class="meta">Tap the heart on any quality and it waits for you here.</p>
      <button class="btn btn-primary" @click="go('catalog')">Open the catalog</button>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 30px 20px 100px; }
.top { margin-bottom: 26px; }
.top h1 { font-size: clamp(28px, 4vw, 38px); }
.top .meta { margin: 7px 0 0; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 22px; }
.empty { padding: 70px 0; text-align: center; }
.empty h3 { font-size: 23px; margin-bottom: 8px; }
.empty .btn { margin-top: 20px; }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 700px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; } }
</style>
