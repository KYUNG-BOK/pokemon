import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlipCard from "../components/FlipCard";

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-green-600",
  rock: "bg-gray-600",
  ghost: "bg-indigo-900",
  dragon: "bg-purple-800",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export default function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("해당 포켓몬은 없어요.");
        const data = await res.json();

        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();
        const koreanName = speciesData.names.find((n) => n.language.name === "ko")?.name;

        setPokemon({
          name: koreanName || data.name,
          front: data.sprites.front_default,
          back: data.sprites.back_default,
          type: data.types.map((t) => t.type.name),
          height: data.height,
          weight: data.weight,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchDetail();
  }, [id]);

  if (!pokemon) return <div className="p-5 text-center text-gray-600">포켓몬 정보를 불러오는 중 . . . </div>;

  return (
    <div className="p-6 max-w-sm mx-auto bg-gradient-to-br from-red-400 via-yellow-300 to-pink-400 rounded-3xl shadow-2xl text-gray-900 mt-5">
      <h1 className="text-3xl font-extrabold mb-6 capitalize text-white drop-shadow-md text-center">
        {pokemon.name}
      </h1>

      <div className="flex flex-col items-center mb-8">
        <div className="w-48 h-60 rounded-xl shadow-lg bg-white p-4 flex items-center justify-center">
          <FlipCard frontSrc={pokemon.front} backSrc={pokemon.back} alt={pokemon.name} />
        </div>
      </div>

      <ul className="bg-white bg-opacity-90 p-6 rounded-xl shadow-inner space-y-5">
        <li>
          <strong>타입:</strong>{" "}
          {pokemon.type.map((type) => (
            <span
              key={type}
              className={`inline-block ${typeColors[type] || "bg-gray-400"} text-white px-3 py-1 rounded-full mr-2 text-sm font-semibold capitalize drop-shadow-md`}
            >
              {type}
            </span>
          ))}
        </li>
        <li>
          <strong>키:</strong> {(pokemon.height / 10).toFixed(1)} m
        </li>
        <li>
          <strong>몸무게:</strong> {(pokemon.weight / 10).toFixed(1)} kg
        </li>
      </ul>
    </div>
  );
}
