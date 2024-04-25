import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PokemonListData = {
  name: string;
  url: string;
};

export default function Home() {
  const [pokemonListData, setPokemonListData] = useState<PokemonListData[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        if (!res.ok) throw new Error("Error fetching data.");

        const data = await res.json();

        setPokemonListData(data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <>
      {pokemonListData.length > 0 ? (
        <ul>
          {pokemonListData.map((pokemon) => {
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
    </>
  );
}
