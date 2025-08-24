import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = { to: string; text: React.ReactNode };

export default function NavButton({ to, text }: Props) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer'
      }}
    >
      {text}
    </button>
  );
}