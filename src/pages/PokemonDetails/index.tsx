import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import PokemonType from "../../components/PokemonType";
import "./pokemonDetails.scss";

type PokemonDetails = {
  name: string;
  moves?: { move: { name: string } }[];
  sprites?: { front_default: string };
  types?: { type: { name: string } }[];
};

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);
  const [moveLimit, setMoveLimit] = useState(6);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setPokemonData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleShowMore = () => {
    if (pokemonData?.moves) setMoveLimit(pokemonData.moves.length);
  };

  return (
    <>
      {pokemonData ? (
        <div className="pokemon-details-wrapper">
          <div>
            <h2>{pokemonData.name}</h2>
            {pokemonData?.sprites && (
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />
            )}
          </div>
          {pokemonData?.moves && (
            <div>
              <h4>Moves</h4>
              <ul>
                {pokemonData.moves.slice(0, moveLimit).map((pm) => {
                  const move = pm.move.name;
                  return <li key={move}>{move}</li>;
                })}
              </ul>
              {pokemonData.moves.length > moveLimit && (
                <button onClick={handleShowMore} className="btn-small">
                  Show All Moves
                </button>
              )}
            </div>
          )}
          {pokemonData?.types && (
            <div>
              <h4>Types</h4>
              <ul>
                {pokemonData.types.map((pt) => {
                  const type = pt.type.name;
                  return (
                    <li key={type}>
                      <PokemonType type={type} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading Pokémon details...</p>
      )}
    </>
  );
}
