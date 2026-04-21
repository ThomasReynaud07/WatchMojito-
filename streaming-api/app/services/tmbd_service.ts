import axios from 'axios'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

export default class TmdbService {
  static async search(query: string, page = 1) {
    const res = await axios.get(`${TMDB_BASE}/search/multi`, {
      params: { api_key: API_KEY, query, page },
    })
    return res.data
  }

  static async getMovie(id: number) {
    const res = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: { api_key: API_KEY, append_to_response: 'videos,images' },
    })
    return res.data
  }

  static async getTv(id: number) {
    const res = await axios.get(`${TMDB_BASE}/tv/${id}`, {
      params: { api_key: API_KEY, append_to_response: 'videos,images' },
    })
    return res.data
  }
}
