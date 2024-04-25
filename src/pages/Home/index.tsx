import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        if (!res.ok) throw new Error("Error fetching data.");

        const data = await res.json();

        setPokemonData(data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <>
      {pokemonData.length > 0 ? (
        <ul>
          {pokemonData.map((pokemon) => {
            const { name, url } = pokemon;
            return (
              <li key={name}>
                <Link to={url}>{name}</Link>
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
