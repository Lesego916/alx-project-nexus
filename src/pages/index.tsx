import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { getTrending, searchMovies } from '../utils/tmdb';

const Container = styled.div`
  max-width:1100px;
  margin:20px auto;
  padding:0 16px;
`;

const SearchBar = styled.div`
  display:flex;
  gap:8px;
  margin:16px 0;
`;

const Input = styled.input`
  flex:1;
  padding:10px;
  border-radius:8px;
  border:none;
  background:#07182a;
  color:white;
`;

const Btn = styled.button`
  padding:10px 14px;
  border-radius:8px;
  border:none;
  background:${p => p.theme.colors.primary};
  color:white;
  cursor:pointer;
`;

const Grid = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:16px;
`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const t = await getTrending();
      setMovies(t);
      setLoading(false);
    }
    load();
  }, []);

  async function onSearch(e: any) {
    e?.preventDefault();
    if (!query) return;
    setLoading(true);
    const r = await searchMovies(query);
    setMovies(r);
    setLoading(false);
  }

  return (
    <div>
      <Navbar />
      <Container>
        <h1>Discover Movies</h1>
        <form onSubmit={onSearch}>
          <SearchBar>
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies by title..." />
            <Btn type="submit">Search</Btn>
          </SearchBar>
        </form>

        {loading ? <p>Loading...</p> : (
          <Grid>
            {movies.length === 0 ? <p>No results.</p> : movies.map((m: any) => <MovieCard key={m.id} movie={m} />)}
          </Grid>
        )}
      </Container>
    </div>
  );
}
