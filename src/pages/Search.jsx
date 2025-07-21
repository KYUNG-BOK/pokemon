import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Search() {
    const [query, setQuery] = useState('');
    const { list } = useSelector((state) => state.pokemon);

    const filtered = list.filter((p) => p.name.includes(query.toLowerCase()));

    return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">포켓몬 검색</h1>
            <div className="relative w-full mb-6 max-w-md mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="포켓몬 이름을 입력하세요(영문으로)"
                    className="border rounded-full px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((poke) => (
                <Link
                    key={poke.id}
                    to={`/detail/${poke.id}`}
                    className="bg-white p-3 rounded shadow hover:shadow-lg transition"
                >
                    <img src={poke.front} alt={poke.name} className="mx-auto" />
                <p className="mt-3 text-lg sm:text-xl font-bold capitalize bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
                    {poke.name}
                </p>
                </Link>
            ))}
        </div>
    </div>
    );
}
