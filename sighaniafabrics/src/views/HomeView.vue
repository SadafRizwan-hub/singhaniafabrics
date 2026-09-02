<script setup>
import FabricCard from '../components/FabricCard.vue'
import FabricSurface from '../components/FabricSurface.vue'
import { FABRICS, DESIGNS, FABRIC_TYPES, PHOTO, rupee } from '../data/catalog.js'
import { go, store, resetFilters } from '../store.js'

const featured = FABRICS.slice(0, 8)
const designs = DESIGNS.slice(0, 6)

function browseType(id) {
  resetFilters()
  store.filters.fabrics.push(id)
  go('catalog')
}
</script>

<template>
  <div>
    <!-- hero -->
    <section class="hero">
      <img :src="PHOTO.kalamkari" alt="Pen kalamkari print on silk" />
      <div class="veil" />
      <div class="shell copy">
        <span class="eyebrow">New this week</span>
        <h1>Pen Kalamkari,<br />cut to your metre</h1>
        <p class="lede">
          Drawn by hand on a pattu silk ground. Sixteen qualities on the floor,
          twelve dyed shades on most of them, and every rate is the wholesale rate.
        </p>
        <div class="cta">
          <button class="btn btn-primary" @click="go('fabric', 'silk-kalam')">Shop the print · {{ rupee(480) }}/m</button>
          <button class="btn btn-ghost" @click="go('catalog')">Browse all 16 qualities</button>
        </div>
      </div>
    </section>

    <!-- fabric types -->
    <section class="shell band">
      <div class="head">
        <h2>Shop by quality</h2>
        <button class="linkish" @click="go('catalog')">See the full catalog</button>
      </div>
      <div class="types">
        <button v-for="t in FABRIC_TYPES" :key="t.id" class="chip" @click="browseType(t.id)">
          {{ t.name }}
        </button>
      </div>
    </section>

    <!-- by the metre -->
    <section class="shell band">
      <div class="head">
        <h2>By the metre</h2>
        <button class="linkish" @click="go('catalog')">See all</button>
      </div>
      <div class="grid">
        <FabricCard v-for="f in featured" :key="f.id" :fabric="f" />
      </div>
    </section>

    <!-- designs -->
    <section class="shell band">
      <div class="head">
        <h2>One design, many grounds</h2>
        <button class="linkish" @click="go('designs')">All designs</button>
      </div>
      <p class="sub">
        The design book sits across qualities — pick the drawing first, then choose
        which cloth it should be printed on.
      </p>
      <div class="designs">
        <button v-for="d in designs" :key="d.id" class="dcard" @click="go('design', d.id)">
          <FabricSurface :item="d" ratio="4 / 3" :caption="false" />
          <span class="dn">{{ d.name }}</span>
          <span class="meta">{{ d.tag }}</span>
        </button>
      </div>
    </section>

    <!-- counter promise -->
    <section class="shell band">
      <div class="promise">
        <div>
          <span class="label">Wholesale rates on</span>
          <h3>Slab pricing past 10 metres</h3>
          <p>Cross the slab and the rate drops on the whole cut — no negotiation, the app shows it before you order.</p>
        </div>
        <div>
          <span class="label">₹20 a card</span>
          <h3>Swatch before you commit</h3>
          <p>Screen colour cannot be trusted. Order the shade card, hold it to your light, then order the than.</p>
        </div>
        <div>
          <span class="label">Cut to order</span>
          <h3>Half-metre increments</h3>
          <p>Cut fresh off the than, folded and dispatched the same evening from Kalbadevi.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20,17,15,.18) 0%, rgba(20,17,15,.05) 35%, rgba(20,17,15,.72) 100%);
}
.copy { position: relative; padding-top: 90px; padding-bottom: 56px; color: #fffdf8; }
.eyebrow {
  font-size: 10.5px;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: rgba(255, 253, 248, 0.82);
}
.hero h1 {
  font-size: clamp(34px, 6vw, 62px);
  margin: 14px 0 16px;
  color: #fffdf8;
  text-shadow: 0 2px 24px rgba(20, 17, 15, 0.35);
}
.lede {
  max-width: 470px;
  margin: 0 0 26px;
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(255, 253, 248, 0.88);
}
.cta { display: flex; flex-wrap: wrap; gap: 10px; }
.cta .btn-primary { background: var(--paper); color: var(--ink); }
.cta .btn-ghost { background: rgba(255,253,248,.12); border-color: rgba(255,253,248,.5); color: #fffdf8; }
.cta .btn-ghost:hover { background: rgba(255,253,248,.22); }

.band { padding: 54px 20px 0; }
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}
.head h2 { font-size: clamp(23px, 3vw, 30px); }
.sub { margin: -10px 0 22px; color: var(--ink-70); font-size: 14px; max-width: 560px; }

.types { display: flex; flex-wrap: wrap; gap: 9px; }

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 30px 22px;
}
.designs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px 22px;
}
.dcard { text-align: left; display: block; }
.dn { display: block; margin: 11px 0 3px; font-size: 14px; }
.dcard .meta { display: block; }
.dcard:hover .dn { color: var(--brass); }

.promise {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
}
.promise > div { background: var(--paper); padding: 28px 26px; }
.promise h3 { font-size: 19px; margin: 10px 0 8px; }
.promise p { margin: 0; font-size: 13.5px; color: var(--ink-70); line-height: 1.55; }

@media (max-width: 1000px) {
  .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .promise { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .hero { min-height: 460px; }
  .copy { padding-top: 60px; padding-bottom: 34px; }
  .cta .btn { flex: 1; min-width: 0; }
  .band { padding-top: 40px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; }
  .designs { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 14px; }
}
</style>
