<template>
  <div class="aspect-video bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
    <iframe
      v-if="embedUrl"
      :src="embedUrl"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
      allow="autoplay"
    ></iframe>
    <div v-else class="h-full flex items-center justify-center text-zinc-500">
      Chargement du lecteur...
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ embedUrl: string }>()
</script>
