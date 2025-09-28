// src/pages/profile.tsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Wrap = styled.div`
  max-width:700px;
  margin:40px auto;
  padding:20px;
  background:${p => p.theme.colors.panel};
  border-radius:12px;
`;

const Btn = styled.button`
  margin-top:12px;
  padding:10px 14px;
  background:${p => p.theme.colors.primary};
  border:none;
  color:white;
  border-radius:8px;
  cursor:pointer;
`;

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const rawUser = localStorage.getItem('rn_user');
    setUser(rawUser ? JSON.parse(rawUser) : null);
    const rawFav = localStorage.getItem('rn_favs');
    setFavCount(rawFav ? JSON.parse(rawFav).length : 0);
  }, []);

  function logout() {
    localStorage.removeItem('rn_user');
    window.location.href = '/login';
  }

  return (
    <div>
      <Navbar />
      <Wrap>
        <h2>My Profile</h2>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name || '(not set)'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Favorites:</strong> {favCount}</p>
            <Btn onClick={logout}>Logout</Btn>
          </div>
        ) : <p>No user logged in.</p>}
      </Wrap>
    </div>
  );
}
