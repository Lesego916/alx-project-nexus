import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Wrap = styled.div`
  max-width:420px;
  margin:40px auto;
  padding:20px;
  background:${p => p.theme.colors.panel};
  border-radius:12px;
`;

const Input = styled.input`
  width:100%;
  padding:10px;
  margin-top:8px;
  border-radius:8px;
  border:none;
  background:#07182a;
  color:white;
`;

const Btn = styled.button`
  width:100%;
  padding:12px;
  margin-top:12px;
  background:${p => p.theme.colors.primary};
  color:white;
  border:none;
  border-radius:8px;
  cursor:pointer;
`;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e: any) {
    e.preventDefault();
    localStorage.setItem('rn_user', JSON.stringify({ email }));
    router.push('/');
  }

  return (
    <div>
      <Navbar />
      <Wrap>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <Input value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Btn type="submit">Login</Btn>
        </form>
        <p style={{ marginTop: 12, color: '#9FB3C8' }}>Don't have an account? <a href="/signup">Sign up</a></p>
      </Wrap>
    </div>
  );
}
