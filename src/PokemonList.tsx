import { useState, useEffect } from "react";
import { PokeAPI } from "./api";
import { Card } from "./Root";

interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchPokemons(offset: number, limit: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, limit);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return {
        id: pokemon.id,
        image: pokemon.sprites.other?.["official-artwork"].front_default ?? "",
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        types: pokemon.types.map((type) => type.type.name),
      };
    }),
  );

  return pokemons;
}

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      const data = await fetchPokemons(offset, limit);
      setPokemons((prev) => [...prev, ...data]);
      setLoading(false);
    };

    loadPokemons();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="min-h-dvh bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Pokémon Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg transition-colors"
          >
            {loading ? "Caricamento..." : "Carica altri Pokémon"}
          </button>
        </div>
      </div>
    </div>
  );
};