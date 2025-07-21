export const fetchAllPokemon = async() => {
    const ids = Array.from({ length : 151}, (_, i) => i+1);

const requests = ids.map(async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return{
        id: data.id,
        name: data.name,
        front: data.sprites.front_default,
        back: data.sprites.back_default,
    };
});
    return await Promise.all(requests);
}