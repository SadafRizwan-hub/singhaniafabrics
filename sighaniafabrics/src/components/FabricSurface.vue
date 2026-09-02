<script setup>
/* Renders either a real photograph of the cloth or, where stock has not
   been photographed yet, a woven-texture stand-in labelled with the name. */
defineProps({
  item: { type: Object, required: true },
  ratio: { type: String, default: '1 / 1' },
  caption: { type: Boolean, default: true },
})
</script>

<template>
  <div class="surface" :style="{ aspectRatio: ratio }">
    <img v-if="item.photo" :src="item.photo" :alt="item.name" loading="lazy" />
    <div v-else class="weave" :class="item.weave || 'weave-plain'">
      <span v-if="caption" class="hand">{{ item.sub || item.name }}</span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.surface {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-md);
  background: #efe8dc;
}
.surface img,
.surface > .weave {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hand {
  position: absolute;
  left: 10px;
  bottom: 9px;
  font-size: 10.5px;
  color: var(--ink-45);
  letter-spacing: 0.2px;
}
</style>
