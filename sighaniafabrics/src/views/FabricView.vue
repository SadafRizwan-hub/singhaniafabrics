<script setup>
import { computed, ref, watch } from 'vue'
import ShadePicker from '../components/ShadePicker.vue'
import FabricSurface from '../components/FabricSurface.vue'
import FabricCard from '../components/FabricCard.vue'
import { fabricById, designById, shadeById, FABRICS, rupee } from '../data/catalog.js'
import { store, go, unitPrice, addToCutList, addSwatch, toggleSave, isSaved } from '../store.js'

const fabric = computed(() => fabricById(store.route.id) || FABRICS[0])
const shade = ref(fabric.value.shades.find((s) => !fabric.value.out.includes(s)))
const metres = ref(6)

watch(fabric, (f) => {
  shade.value = f.shades.find((s) => !f.out.includes(s))
  metres.value = 6
})

const rate = computed(() => unitPrice(fabric.value, metres.value))
const total = computed(() => rate.value * metres.value)
const onSlab = computed(() => fabric.value.slab && metres.value >= fabric.value.slab.from)
const design = computed(() => designById[fabric.value.design] || null)
const related = computed(() => FABRICS.filter((f) => f.id !== fabric.value.id && (f.type === fabric.value.type || f.design === fabric.value.design)).slice(0, 4))

const step = (d) => { metres.value = Math.max(0.5, Math.round((metres.value + d) * 2) / 2) }
</script>

<template>
  <div class="shell page">
    <button class="back" @click="go('catalog')">
      <svg viewBox="0 0 16 16" width="13" height="13"><path d="M9.5 3 5 8l4.5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Back to catalog
    </button>

    <div class="split">
      <!-- cloth -->
      <div class="visual">
        <FabricSurface :item="fabric" ratio="4 / 5" :caption="false">
          <span class="scale">↘ True scale 1:1</span>
        </FabricSurface>
        <button class="heart" :class="{ on: isSaved(fabric.id) }" @click="toggleSave(fabric.id)">
          <svg viewBox="0 0 20 20" width="17" height="17"><path d="M10 16.2 4.6 11a3.4 3.4 0 1 1 5.4-4 3.4 3.4 0 1 1 5.4 4Z" :fill="isSaved(fabric.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <!-- counter -->
      <div class="detail">
        <div class="titlerow">
          <div>
            <h1>{{ fabric.name }}</h1>
            <p class="meta">{{ fabric.sub }}</p>
          </div>
          <p class="rate big">
            {{ rupee(fabric.price) }}<span class="per">/m</span>
            <span v-if="fabric.mrp" class="was">{{ rupee(fabric.mrp) }}/m</span>
          </p>
        </div>

        <p class="note">{{ fabric.note }}</p>

        <section class="block">
          <header>
            <span class="label">Available shades {{ fabric.shades.length }}</span>
            <span class="chosen">{{ shadeById[shade]?.name }}</span>
          </header>
          <ShadePicker v-model="shade" :shades="fabric.shades" :out="fabric.out" :columns="6" />
        </section>

        <section v-if="design" class="block">
          <header><span class="label">Design</span></header>
          <button class="designlink" @click="go('design', design.id)">
            <span class="dthumb"><FabricSurface :item="design" ratio="1 / 1" :caption="false" /></span>
            <span>
              <b>{{ design.name }}</b>
              <i class="meta">{{ design.tag }} · see every ground</i>
            </span>
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </section>

        <!-- metre picker -->
        <div class="tray">
          <div class="stepper">
            <button @click="step(-0.5)" aria-label="Less">−</button>
            <span class="qty">{{ metres }} <i>m</i></span>
            <button class="plus" @click="step(0.5)" aria-label="More">+</button>
          </div>
          <div class="sum">
            <p class="rate big">{{ rupee(total) }}</p>
            <p v-if="fabric.slab" class="slabline" :class="{ hit: onSlab }">
              <template v-if="onSlab">Slab rate applied · {{ rupee(fabric.slab.price) }}/m</template>
              <template v-else>{{ fabric.slab.from }} m+ at {{ rupee(fabric.slab.price) }}/m</template>
            </p>
            <p v-else class="meta">{{ rupee(rate) }}/m · cut to order</p>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-ghost" @click="addSwatch(fabric.id, shade)">Swatch {{ rupee(fabric.swatchPrice) }}</button>
          <button class="btn btn-primary" @click="addToCutList(fabric.id, shade, metres)">
            Add {{ metres }} m · {{ shadeById[shade]?.name }}
          </button>
        </div>

        <dl class="specs">
          <div><dt>Width</dt><dd>{{ fabric.width }}</dd></div>
          <div><dt>Quality</dt><dd class="cap">{{ fabric.type }}</dd></div>
          <div><dt>Stock</dt><dd :class="{ low: fabric.stock === 'low stock' }">{{ fabric.stock }}</dd></div>
          <div><dt>Cut</dt><dd>0.5 m steps</dd></div>
        </dl>
      </div>
    </div>

    <section v-if="related.length" class="related">
      <h2>Goes with this</h2>
      <div class="grid">
        <FabricCard v-for="f in related" :key="f.id" :fabric="f" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page { padding: 22px 20px 70px; }
.back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--ink-70);
  margin-bottom: 22px;
}
.back:hover { color: var(--ink); }

.split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 52px; align-items: start; }
.visual { position: relative; position: sticky; top: 90px; }
.scale {
  position: absolute;
  left: 14px; bottom: 14px;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  background: rgba(20, 17, 15, 0.62);
  color: #fffdf8;
  font-size: 11px;
  letter-spacing: 0.2px;
}
.heart {
  position: absolute;
  top: 14px; right: 14px;
  width: 38px; height: 38px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: rgba(255, 253, 248, 0.92);
  color: var(--ink-70);
}
.heart.on { color: var(--terracotta); }

.titlerow { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
.titlerow h1 { font-size: clamp(28px, 3.6vw, 40px); }
.titlerow .meta { margin: 7px 0 0; }
.rate.big { font-size: 22px; margin: 0; white-space: nowrap; }
.rate.big .was { display: block; text-align: right; font-size: 12.5px; margin: 3px 0 0; }

.note {
  margin: 20px 0 0;
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line-soft);
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-70);
  max-width: 52ch;
}

.block { padding: 26px 0; border-bottom: 1px solid var(--line-soft); }
.block header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
}
.chosen { font-size: 12.5px; color: var(--ink); }

.designlink {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  text-align: left;
  color: var(--ink-70);
  transition: border-color 0.14s;
}
.designlink:hover { border-color: var(--line-strong); }
.dthumb { width: 52px; flex-shrink: 0; }
.designlink b { display: block; font-weight: 500; font-size: 13.5px; color: var(--ink); }
.designlink i { display: block; font-style: normal; margin-top: 2px; }
.designlink svg { margin-left: auto; }

.tray {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin: 26px 0 14px;
  padding: 14px 18px;
  background: var(--sand);
  border-radius: var(--r-lg);
}
.stepper { display: flex; align-items: center; gap: 6px; }
.stepper button {
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--paper);
  font-size: 18px;
  line-height: 1;
  color: var(--ink);
}
.stepper .plus { background: var(--ink); color: var(--paper); }
.qty { min-width: 62px; text-align: center; font-size: 19px; font-weight: 500; font-variant-numeric: tabular-nums; }
.qty i { font-style: normal; font-size: 12px; color: var(--ink-45); }
.sum { text-align: right; }
.sum .rate.big { font-size: 21px; }
.slabline { margin: 3px 0 0; font-size: 11.5px; color: var(--ink-45); }
.slabline.hit { color: var(--terracotta); }

.actions { display: flex; gap: 10px; }
.actions .btn-primary { flex: 1; }

.specs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 30px 0 0;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--r-md);
  overflow: hidden;
}
.specs > div { background: var(--paper); padding: 14px 15px; }
.specs dt { font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--ink-45); }
.specs dd { margin: 5px 0 0; font-size: 13.5px; }
.specs .cap { text-transform: capitalize; }
.specs .low { color: var(--terracotta); }

.related { margin-top: 70px; }
.related h2 { font-size: 26px; margin-bottom: 20px; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 30px 22px; }

@media (max-width: 900px) {
  .page { padding: 14px 0 100px; position: relative; }
  .split { grid-template-columns: 1fr; gap: 0; }
  .visual { position: static; }
  .visual :deep(.surface) { border-radius: 0; }
  .back {
    position: absolute;
    top: 14px; left: 14px;
    z-index: 5;
    width: 36px; height: 36px;
    justify-content: center;
    gap: 0;
    border-radius: 50%;
    background: rgba(255, 253, 248, 0.92);
    font-size: 0;
    margin: 0;
  }
  .heart { top: 12px; }
  .detail { padding: 22px 20px 0; }
  .specs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .related { padding: 0 20px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; }
  .actions {
    position: sticky;
    bottom: 62px;
    margin: 24px -20px 0;
    padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
    background: rgba(248, 245, 239, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--line-soft);
  }
}
</style>
