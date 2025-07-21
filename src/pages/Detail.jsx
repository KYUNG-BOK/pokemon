import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState(null);

useEffect(() => {
    const fetchDetail = async () => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!res.ok) throw new Error('해당 포켓몬은 없어요.');
            const data = await res.json();

            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesRes.json();
            const koreanName = speciesData.names.find(n => n.language.name === 'ko')?.name;

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


    if (!pokemon) return <div className="p-5">포켓몬 정보를 불러오는 중 . . . </div>

    return (
    <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h1>
        <div className="flex justify-center gap-6 mb-4">
            <img src={pokemon.front} alt="front" />
            <img src={pokemon.back} alt="back" />
        </div>
        <ul className="bg-white p-4 rounded shadow">
            <li><strong>타입:</strong> {pokemon.type.join(', ')}</li>
            <li><strong>키:</strong> {pokemon.height}</li>
            <li><strong>몸무게:</strong> {pokemon.weight}</li>
        </ul>
    </div>
    );
}