import axios from 'axios';

const BASE = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '59bfe33b0e54ec72d7fd253b58ed259b';

export async function searchMovies(query: string) {
  if (!KEY) {
    console.warn('TMDB API key not set. searchMovies will return [].');
    return [];
  }
  const url = `${BASE}/search/movie`;
  const res = await axios.get(url, { params: { api_key: KEY, query, include_adult: false } });
  return res.data.results || [];
}

export async function getTrending() {
  if (!KEY) {
    console.warn('TMDB API key not set. getTrending will return [].');
    return [];
  }
  const url = `${BASE}/trending/movie/week`;
  const res = await axios.get(url, { params: { api_key: KEY } });
  return res.data.results || [];
}

export function posterUrl(path: string | null, size = 'w342') {
  if (!path) return '/placeholder_poster.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
