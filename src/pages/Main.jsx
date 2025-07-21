import { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { loadPokemon } from "../features/pokemon/pokemonSlice";
import { Link } from "react-router-dom";

export default function Main() {
    const dispatch = useDispatch();
    const {list, status} = useSelector((state) => state.pokemon);

    useEffect(() => {
        if (status === 'idle') dispatch(loadPokemon());
    }, [dispatch, status]);

    return(
        <main className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-200 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 drop-shadow-md">
                포켓몬 도감
            </h1>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {status === 'loading' && <p className="col-span-full text-center text-gray-700">로딩 중...</p>}
                {status === 'succeeded' &&
                    list.map((poke) => (
                    <Link
                        to={`/detail/${poke.id}`}
                        key={poke.id}
                        className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center"
                    >
                        <img src={poke.front} alt={poke.name} className="w-24 h-24 object-contain" />
                        <h2 className="mt-3 text-lg sm:text-xl font-bold capitalize bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {poke.koreanName || poke.name}
                        </h2>
                    </Link>
                ))}
            </section>
        </main>
    );
}
