import Link from 'next/link';
import styled from 'styled-components';

const Wrap = styled.nav`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 20px;
  background:${p => p.theme.colors.panel};
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const Brand = styled.div`
  font-weight:700;
  font-size:18px;
  color:${p => p.theme.colors.primary};
`;

const Right = styled.div`
  display:flex;
  gap:16px;
  align-items:center;
  a { color: ${p => p.theme.colors.subtext}; }
`;

export default function Navbar() {
  return (
    <Wrap>
      <Brand>ReelNest</Brand>
      <Right>
        <Link href="/">Home</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
      </Right>
    </Wrap>
  );
}
