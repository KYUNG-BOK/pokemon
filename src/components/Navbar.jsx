import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex gap-6 font-semibold">
      <Link to="/" className="hover:underline">홈</Link>
      <Link to="/search" className="hover:underline">검색</Link>
      <Link to="/favorites" className="hover:underline">찜 목록</Link>
    </nav>
  );
}
