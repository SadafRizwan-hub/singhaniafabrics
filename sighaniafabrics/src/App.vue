<script setup>
import { computed } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import MobileTabs from './components/MobileTabs.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomeView from './views/HomeView.vue'
import CatalogView from './views/CatalogView.vue'
import FabricView from './views/FabricView.vue'
import DesignsView from './views/DesignsView.vue'
import DesignView from './views/DesignView.vue'
import CutListView from './views/CutListView.vue'
import SavedView from './views/SavedView.vue'
import AboutView from './views/AboutView.vue'
import { store } from './store.js'

const views = {
  home: HomeView,
  catalog: CatalogView,
  fabric: FabricView,
  designs: DesignsView,
  design: DesignView,
  cutlist: CutListView,
  saved: SavedView,
  about: AboutView,
}
const current = computed(() => views[store.route.name] || HomeView)
</script>

<template>
  <SiteHeader />
  <main>
    <component :is="current" :key="store.route.name + (store.route.id || '')" />
  </main>
  <SiteFooter />
  <MobileTabs />
  <transition name="toast">
    <div v-if="store.toast" class="toast">{{ store.toast }}</div>
  </transition>
</template>

<style scoped>
main { min-height: 60vh; }
.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 80;
  padding: 12px 20px;
  border-radius: var(--r-pill);
  background: var(--ink);
  color: var(--paper);
  font-size: 13px;
  box-shadow: 0 8px 30px rgba(20, 17, 15, 0.3);
  white-space: nowrap;
}
.toast-enter-active, .toast-leave-active { transition: opacity 0.2s, transform 0.2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
@media (max-width: 900px) { .toast { bottom: 88px; } }
</style>
