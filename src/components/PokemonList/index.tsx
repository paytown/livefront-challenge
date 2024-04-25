import { Link } from "react-router-dom";

type FilteredPokemon = {
  filteredPokemon: { name: string; url: string }[];
  isLoading: boolean;
};

export default function PokemonList({
  filteredPokemon,
  isLoading,
}: FilteredPokemon) {
  return (
    <div>
      {filteredPokemon.length > 0 ? (
        <ul>
          {filteredPokemon.map((pokemon) => {
            const { name } = pokemon;
            return (
              <li key={name}>
                <Link to={`/pokemon/${name}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      ) : isLoading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
