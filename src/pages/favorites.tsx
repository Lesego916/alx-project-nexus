import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

const Container = styled.div`
  max-width:1100px;
  margin:20px auto;
  padding:0 16px;
`;

const Grid = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:16px;
`;

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('rn_favs');
    setFavorites(raw ? JSON.parse(raw) : []);
    const handler = () => {
      const r = localStorage.getItem('rn_favs');
      setFavorites(r ? JSON.parse(r) : []);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <h1>My Favorites</h1>
        {!favorites.length ? <p>No favorites yet.</p> : (
          <Grid>{favorites.map(m => <MovieCard key={m.id} movie={m} />)}</Grid>
        )}
      </Container>
    </div>
  );
}
