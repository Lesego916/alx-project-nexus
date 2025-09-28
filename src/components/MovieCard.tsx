import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { posterUrl } from '../utils/tmdb';

const Card = styled.div`
  background:${p => p.theme.colors.panel};
  padding:8px;
  border-radius:${p => p.theme.radii.md};
  width:180px;
  display:flex;
  flex-direction:column;
`;

const Poster = styled.img`
  width:100%;
  height:270px;
  object-fit:cover;
  border-radius:8px;
  background: #071024;
`;

const Title = styled.div`
  font-weight:600;
  margin-top:8px;
  color:${p => p.theme.colors.text};
  font-size:14px;
`;

const Sub = styled.div`
  color:${p => p.theme.colors.subtext};
  font-size:13px;
  margin-top:4px;
`;

const FavBtn = styled.button`
  margin-top:10px;
  padding:8px;
  background:transparent;
  color:${p => p.theme.colors.accent};
  border:1px solid rgba(255,255,255,0.06);
  border-radius:8px;
  cursor:pointer;
`;

type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
  [key: string]: any;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('rn_favs');
    const favs = raw ? JSON.parse(raw) : [];
    setSaved(favs.some((m: any) => m.id === movie.id));
  }, [movie.id]);

  function toggleFav() {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('rn_favs');
    const favs = raw ? JSON.parse(raw) : [];
    if (saved) {
      const updated = favs.filter((m: any) => m.id !== movie.id);
      localStorage.setItem('rn_favs', JSON.stringify(updated));
      setSaved(false);
    } else {
      favs.unshift(movie);
      localStorage.setItem('rn_favs', JSON.stringify(favs));
      setSaved(true);
    }
  }

  return (
    <Card>
      <Poster src={posterUrl(movie.poster_path || null)} alt={movie.title} />
      <Title title={movie.title}>{movie.title}</Title>
      <Sub>⭐ {movie.vote_average ?? '—'} • {movie.release_date ? movie.release_date.slice(0,4) : '—'}</Sub>
      <FavBtn onClick={toggleFav}>{saved ? 'Saved ✓' : 'Save'}</FavBtn>
    </Card>
  );
}
