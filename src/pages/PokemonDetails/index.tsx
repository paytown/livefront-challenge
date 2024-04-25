import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type PokemonDetails = {
  name: string;
  moves?: { move: { name: string } }[];
  types?: { type: { name: string } }[];
};

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Error fetching data.");

        const data = await res.json();

        setPokemonData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemon();
  }, [id]);

  return (
    <div>
      {pokemonData ? (
        <div>
          <h2>{pokemonData.name}</h2>
          {pokemonData?.moves && (
            <div>
              <h4>moves</h4>
              <ul>
                {pokemonData.moves.map((pm) => {
                  const move = pm.move.name;
                  return <li key={move}>{move}</li>;
                })}
              </ul>
            </div>
          )}
          {pokemonData?.types && (
            <div>
              <h4>types</h4>
              <ul>
                {pokemonData.types.map((pt) => {
                  const type = pt.type.name;
                  return <li key={type}>{type}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading Pokémon details...</p>
      )}
    </div>
  );
}
