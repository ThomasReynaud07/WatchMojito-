import type { HttpContext } from '@adonisjs/core/http'
import TmdbService from '#services/tmbd_service'

export default class MoviesController {
  async search({ request }: HttpContext) {
    const query = request.input('q')
    const data = await TmdbService.search(query)
    return data
  }

  async show({ params }: HttpContext) {
    const { id, type } = params

    if (type === 'movie') {
      const movie = await TmdbService.getMovie(id)
      return {
        ...movie,
        embed_url: `https://vidsrc.wiki/embed/movie/${id}`,
      }
    } else {
      const tv = await TmdbService.getTv(id)
      return {
        ...tv,
        embed_url: `https://vidsrc.wiki/embed/tv/${id}/1/1`,
      }
    }
  }
}
