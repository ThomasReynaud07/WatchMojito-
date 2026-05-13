<template>
  <router-link :to="`/media/${media.media_type || type}/${media.id}`" class="block">
    <div class="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform">
      <img :src="posterUrl" alt="" class="w-full aspect-[2/3] object-cover" />
      <div class="p-3">
        <h3 class="font-semibold text-white line-clamp-2">{{ media.title || media.name }}</h3>
        <p class="text-zinc-400 text-sm">
          {{ releaseYear }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  media: any
  type?: 'movie' | 'tv'
}>()

const posterUrl = computed(() => {
  return props.media.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.media.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Pas+d%27image'
})

const releaseYear = computed(() => {
  const date = props.media.release_date || props.media.first_air_date
  return date ? date.slice(0, 4) : ''
})
</script>
