import { reactive, computed } from 'vue'
import { fabricById } from './data/catalog.js'

export const store = reactive({
  route: { name: 'home', id: null },
  filters: { fabrics: [], colours: [], designs: [] },
  search: '',
  sort: 'featured',
  sheetOpen: false,
  cutList: [],
  saved: [],
  toast: '',
})

export function go(name, id = null) {
  store.route = { name, id }
  store.sheetOpen = false
  window.scrollTo(0, 0)
}

export function resetFilters() {
  store.filters.fabrics = []
  store.filters.colours = []
  store.filters.designs = []
}

export const filterCount = computed(
  () => store.filters.fabrics.length + store.filters.colours.length + store.filters.designs.length,
)

/* ── cut list ─────────────────────────────────────────────────── */

export function unitPrice(fabric, metres) {
  if (fabric.slab && metres >= fabric.slab.from) return fabric.slab.price
  return fabric.price
}

export function addToCutList(fabricId, shadeId, metres) {
  const key = fabricId + ':' + shadeId
  const found = store.cutList.find((l) => l.key === key)
  if (found) found.metres += metres
  else store.cutList.push({ key, fabricId, shadeId, metres })
  flash(`${metres} m added to the cut list`)
}

export function addSwatch(fabricId, shadeId) {
  const key = fabricId + ':' + shadeId + ':swatch'
  if (!store.cutList.find((l) => l.key === key)) {
    store.cutList.push({ key, fabricId, shadeId, metres: 0, swatch: true })
  }
  flash('Swatch card added')
}

export function removeLine(key) {
  store.cutList = store.cutList.filter((l) => l.key !== key)
}

export function setMetres(key, metres) {
  const line = store.cutList.find((l) => l.key === key)
  if (line) line.metres = Math.max(0.5, Math.round(metres * 2) / 2)
}

export const lineTotal = (line) => {
  const fab = fabricById(line.fabricId)
  if (!fab) return 0
  if (line.swatch) return fab.swatchPrice
  return unitPrice(fab, line.metres) * line.metres
}

export const cutListTotal = computed(() => store.cutList.reduce((s, l) => s + lineTotal(l), 0))
export const cutListMetres = computed(() => store.cutList.reduce((s, l) => s + (l.swatch ? 0 : l.metres), 0))
export const cutListCount = computed(() => store.cutList.length)

export function toggleSave(fabricId) {
  const i = store.saved.indexOf(fabricId)
  if (i === -1) { store.saved.push(fabricId); flash('Saved to your shortlist') }
  else { store.saved.splice(i, 1); flash('Removed from shortlist') }
}
export const isSaved = (id) => store.saved.includes(id)

let toastTimer
export function flash(message) {
  store.toast = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (store.toast = ''), 2400)
}
