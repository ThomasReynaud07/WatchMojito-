<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <button @click="$router.back()" class="mb-6 text-red-600 hover:underline">← Retour</button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Infos -->
        <div>
          <img :src="posterUrl" class="w-full rounded-2xl shadow-2xl" />
          <h1 class="text-4xl font-bold mt-6">{{ media.title || media.name }}</h1>
          <p class="text-zinc-400 mt-2">
            {{ media.release_date || media.first_air_date }} • {{ media.vote_average }}/10
          </p>
          <p class="mt-6 text-zinc-300 leading-relaxed">{{ media.overview }}</p>
        </div>

        <!-- Player -->
        <div class="lg:col-span-2">
          <Player :embedUrl="embedUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Player from '../components/Player.vue'

const props = defineProps<{ type: string; id: string }>()

const media = ref<any>({})
const embedUrl = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`/api/media/${props.type}/${props.id}`)
    media.value = res.data
    embedUrl.value = res.data.embed_url
  } catch (err) {
    console.error(err)
  }
})

const posterUrl = computed(() => {
  return media.value.poster_path ? `https://image.tmdb.org/t/p/w500${media.value.poster_path}` : ''
})
</script>
