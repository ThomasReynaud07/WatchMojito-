<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <button @click="$router.back()" class="mb-6 text-red-600 hover:underline">← Retour</button>

      <div v-if="!query" class="text-center text-zinc-400 py-20">
        Entrez un terme de recherche depuis la page d’accueil.
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold mb-6">Résultats pour « {{ query }} »</h1>

        <div v-if="loading" class="text-center py-10">Chargement...</div>

        <div v-else-if="results.length === 0" class="text-center text-zinc-400 py-10">
          Aucun résultat trouvé.
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <MovieCard v-for="item in results" :key="item.id" :media="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'

const route = useRoute()
const query = ref(route.query.q?.toString() || '')
const results = ref<any[]>([])
const loading = ref(false)

const fetchResults = async () => {
  if (!query.value) {
    results.value = []
    return
  }

  loading.value = true
  try {
    const res = await axios.get(`/api/search?q=${encodeURIComponent(query.value)}`)
    results.value = res.data.results || []
  } catch (err) {
    console.error(err)
    results.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchResults)

watch(
  () => route.query.q,
  (newQuery) => {
    query.value = newQuery?.toString() || ''
    fetchResults()
  }
)
</script>
