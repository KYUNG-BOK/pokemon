import React from 'react';

// 목업으로 띄워놨습니다.
const mockFavorites = [
    {
    id: 25,
    name: 'pikachu',
    front: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
];

export default function Favorites() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">찜한 포켓몬</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mockFavorites.length === 0 ? (
          <p>찜한 포켓몬이 없습니다.</p>
        ) : (
          mockFavorites.map((poke) => (
            <div key={poke.id} className="bg-white p-3 rounded shadow">
              <img src={poke.front} alt={poke.name} className="mx-auto" />
              <p className="text-center mt-2 font-semibold capitalize">{poke.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}