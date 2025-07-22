import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../features/pokemon/favoriteSlice';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const favoriteIds = useSelector(selectFavoriteIds);
  const allPokemons = useSelector((state) => state.pokemon.list);

  // 찜한 포켓몬 필터링하기
  const favorites = allPokemons.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">찜한 포켓몬</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.length === 0 ? (
          <p>찜한 포켓몬이 없습니다.</p>
        ) : (
          favorites.map((poke) => (
            <Link
              key={poke.id}
              to={`/detail/${poke.id}`}
              className="bg-white p-3 rounded shadow relative hover:shadow-lg transition"
            >
              <img src={poke.front} alt={poke.name} className="mx-auto" />
              <p className="text-center mt-2 font-semibold capitalize">
                {poke.koreanName || poke.name}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}