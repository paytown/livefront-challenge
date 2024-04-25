import { Link } from "react-router-dom";

type FilteredPokemon = {
  filteredPokemon: { name: string; url: string }[];
};

export default function PokemonList({ filteredPokemon }: FilteredPokemon) {
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
      ) : (
        <p>No Results Found</p>
      )}
    </div>
  );
}
