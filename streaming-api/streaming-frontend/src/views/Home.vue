<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <!-- Navbar simple -->
    <nav class="bg-black p-4 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-bold text-red-600">MyStream</h1>

        <div class="flex-1 max-w-xl mx-8">
          <input
            v-model="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Rechercher un film ou une série..."
            class="w-full bg-zinc-900 border border-zinc-700 rounded-full px-6 py-3 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <h2 class="text-2xl font-bold mb-6">Tendances du moment</h2>

      <div v-if="loading" class="text-center py-10">Chargement...</div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <MovieCard v-for="item in trending" :key="item.id" :media="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'

const router = useRouter()
const trending = ref<any[]>([])
const searchQuery = ref('')
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/trending')
    trending.value = res.data.results || []
  } catch (err) {
    console.error(err)
  }
  loading.value = false
})

const search = async () => {
  if (!searchQuery.value.trim()) return
  router.push({ name: 'search', query: { q: searchQuery.value } })
}
</script>
