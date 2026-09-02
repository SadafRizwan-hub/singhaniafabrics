<script setup>
import { computed } from 'vue'
import FabricSurface from '../components/FabricSurface.vue'
import { fabricById, shadeById, rupee } from '../data/catalog.js'
import { store, go, removeLine, setMetres, lineTotal, cutListTotal, cutListMetres, unitPrice, flash } from '../store.js'

const lines = computed(() =>
  store.cutList.map((l) => ({
    ...l,
    fabric: fabricById(l.fabricId),
    shade: shadeById[l.shadeId],
    total: lineTotal(l),
  })),
)

const delivery = computed(() => (cutListTotal.value >= 2000 || !store.cutList.length ? 0 : 120))
const grand = computed(() => cutListTotal.value + delivery.value)
</script>

<template>
  <div class="shell page">
    <header class="top">
      <h1>Cut list</h1>
      <p class="meta">
        {{ store.cutList.length }} {{ store.cutList.length === 1 ? 'line' : 'lines' }} ·
        {{ cutListMetres }} m to be cut
      </p>
    </header>

    <div v-if="!lines.length" class="empty">
      <h3>Nothing on the list yet</h3>
      <p class="meta">Pick a quality, choose a shade, set your metres — it collects here.</p>
      <button class="btn btn-primary" @click="go('catalog')">Open the catalog</button>
    </div>

    <div v-else class="split">
      <section class="lines">
        <article v-for="l in lines" :key="l.key" class="line">
          <button class="lthumb" @click="go('fabric', l.fabricId)">
            <FabricSurface :item="l.fabric" ratio="1 / 1" :caption="false" />
          </button>

          <div class="ltext">
            <h3 @click="go('fabric', l.fabricId)">{{ l.fabric.name }}</h3>
            <p class="meta">
              <span class="sw" :style="{ background: l.shade.hex }" />{{ l.shade.name }} · {{ l.fabric.width }}
            </p>
            <p v-if="l.swatch" class="swatchtag">Swatch card</p>
            <p v-else class="meta unit">
              {{ rupee(unitPrice(l.fabric, l.metres)) }}/m
              <span v-if="l.fabric.slab && l.metres >= l.fabric.slab.from" class="slab">slab rate</span>
            </p>
          </div>

          <div class="lqty">
            <div v-if="!l.swatch" class="stepper">
              <button @click="setMetres(l.key, l.metres - 0.5)">−</button>
              <span>{{ l.metres }} m</span>
              <button @click="setMetres(l.key, l.metres + 0.5)">+</button>
            </div>
            <p class="rate">{{ rupee(l.total) }}</p>
            <button class="remove" @click="removeLine(l.key)">Remove</button>
          </div>
        </article>
      </section>

      <aside class="summary">
        <h2>Order summary</h2>
        <dl>
          <div><dt>Cloth ({{ cutListMetres }} m)</dt><dd>{{ rupee(cutListTotal) }}</dd></div>
          <div><dt>Delivery</dt><dd>{{ delivery ? rupee(delivery) : 'Free' }}</dd></div>
          <div v-if="delivery" class="hint"><dt>Free over ₹2,000</dt><dd>{{ rupee(2000 - cutListTotal) }} to go</dd></div>
          <div class="grand"><dt>Total</dt><dd>{{ rupee(grand) }}</dd></div>
        </dl>
        <button class="btn btn-primary wide" @click="flash('Sample site — no real checkout wired up')">
          Place the cut order
        </button>
        <p class="fine">
          Cut fresh off the than in half-metre steps. Dispatched the same evening from
          Kalbadevi; cut cloth is not returnable, so order the swatch card first.
        </p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 30px 20px 100px; }
.top { margin-bottom: 26px; }
.top h1 { font-size: clamp(28px, 4vw, 38px); }
.top .meta { margin: 7px 0 0; }

.empty { padding: 70px 0; text-align: center; }
.empty h3 { font-size: 23px; margin-bottom: 8px; }
.empty .btn { margin-top: 20px; }

.split { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 44px; align-items: start; }

.line {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line-soft);
}
.line:first-child { border-top: 1px solid var(--line-soft); }
.lthumb { padding: 0; }
.ltext h3 { font-family: var(--sans); font-size: 15px; font-weight: 400; cursor: pointer; }
.ltext h3:hover { color: var(--brass); }
.ltext .meta { display: flex; align-items: center; gap: 6px; margin: 5px 0 0; }
.sw { width: 10px; height: 10px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(20,17,15,.15); }
.unit { margin-top: 8px; }
.slab { color: var(--terracotta); }
.swatchtag { margin: 8px 0 0; font-size: 11.5px; color: var(--brass); }

.lqty { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.stepper { display: flex; align-items: center; gap: 4px; }
.stepper button {
  width: 28px; height: 28px;
  display: grid; place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--paper);
  font-size: 15px;
  line-height: 1;
}
.stepper button:hover { background: var(--sand); }
.stepper span { min-width: 52px; text-align: center; font-size: 13.5px; font-variant-numeric: tabular-nums; }
.lqty .rate { font-size: 15px; margin: 0; }
.remove { font-size: 11.5px; color: var(--ink-45); }
.remove:hover { color: var(--terracotta); }

.summary {
  position: sticky;
  top: 90px;
  padding: 24px;
  background: var(--paper);
  border: 1px solid var(--line-soft);
  border-radius: var(--r-lg);
}
.summary h2 { font-size: 21px; margin-bottom: 16px; }
.summary dl { margin: 0 0 20px; }
.summary dl > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  font-size: 13.5px;
  color: var(--ink-70);
}
.summary dt, .summary dd { margin: 0; }
.summary .hint { font-size: 11.5px; color: var(--brass); padding-top: 0; }
.summary .grand {
  margin-top: 6px;
  padding-top: 15px;
  border-top: 1px solid var(--line);
  font-size: 17px;
  color: var(--ink);
  font-weight: 500;
}
.wide { width: 100%; }
.fine { margin: 16px 0 0; font-size: 11.5px; line-height: 1.55; color: var(--ink-45); }

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; gap: 30px; }
  .summary { position: static; }
  .line { grid-template-columns: 68px minmax(0, 1fr); }
  .lqty {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
