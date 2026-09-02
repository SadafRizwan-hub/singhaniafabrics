<script setup>
import FabricSurface from '../components/FabricSurface.vue'
import { DESIGNS, fabricsForDesign } from '../data/catalog.js'
import { go } from '../store.js'
</script>

<template>
  <div class="shell page">
    <header class="top">
      <h1>The design book</h1>
      <p class="sub">
        Every drawing in the book can be printed or woven on more than one ground.
        Pick the design, then choose the cloth underneath it.
      </p>
    </header>

    <div class="grid">
      <button v-for="d in DESIGNS" :key="d.id" class="card" @click="go('design', d.id)">
        <FabricSurface :item="d" ratio="4 / 3" :caption="false" />
        <h3>{{ d.name }}</h3>
        <p class="meta">{{ d.tag }}</p>
        <p class="on">On {{ fabricsForDesign(d.id).length }} {{ fabricsForDesign(d.id).length === 1 ? 'quality' : 'qualities' }}</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 30px 20px 80px; }
.top { margin-bottom: 30px; }
.top h1 { font-size: clamp(28px, 4vw, 38px); }
.sub { margin: 10px 0 0; max-width: 560px; font-size: 14px; color: var(--ink-70); line-height: 1.6; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 22px; }
.card { text-align: left; }
.card h3 { font-family: var(--sans); font-size: 14.5px; font-weight: 400; margin: 12px 0 3px; }
.card:hover h3 { color: var(--brass); }
.on { margin: 8px 0 0; font-size: 11.5px; color: var(--brass); }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 700px) {
  .page { padding-bottom: 100px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; }
}
</style>
