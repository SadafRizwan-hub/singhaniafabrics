<script setup>
import { go } from '../store.js'
</script>

<template>
  <footer class="foot">
    <div class="shell inner">
      <div class="brandcol">
        <span class="mark">SF</span>
        <p>Singhania Fabrics · Mangaldas Market, Kalbadevi, Mumbai 400002</p>
        <p class="fine">Sample site built to demonstrate the catalogue design. Rates and stock are illustrative.</p>
      </div>
      <nav>
        <span class="label">Shop</span>
        <button @click="go('catalog')">Catalog</button>
        <button @click="go('designs')">Design book</button>
        <button @click="go('cutlist')">Cut list</button>
        <button @click="go('saved')">Shortlist</button>
      </nav>
      <nav>
        <span class="label">The shop</span>
        <button @click="go('about')">About the counter</button>
        <button @click="go('about')">Rates &amp; slabs</button>
        <button @click="go('about')">Cutting &amp; dispatch</button>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  margin-top: 80px;
  padding: 44px 0 34px;
  border-top: 1px solid var(--line-soft);
  background: var(--paper);
}
.inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 34px; }
.mark { font-family: var(--serif); font-size: 24px; }
.brandcol p { margin: 12px 0 0; font-size: 13px; color: var(--ink-70); max-width: 42ch; }
.brandcol .fine { font-size: 11.5px; color: var(--ink-45); }
nav { display: flex; flex-direction: column; align-items: flex-start; gap: 9px; }
nav .label { margin-bottom: 4px; }
nav button { font-size: 13px; color: var(--ink-70); }
nav button:hover { color: var(--ink); }
@media (max-width: 900px) {
  .foot { margin-bottom: 62px; }
  .inner { grid-template-columns: 1fr 1fr; gap: 28px; }
  .brandcol { grid-column: 1 / -1; }
}
</style>
