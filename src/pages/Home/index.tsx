import { SyntheticEvent, KeyboardEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PokemonListData = {
  name: string;
  url: string;
};

export default function Home() {
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListData[]>([]);
  const [allPokemon, setAllPokemon] = useState<PokemonListData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        if (!res.ok) throw new Error("Error fetching data.");

        const data = await res.json();

        setFilteredPokemon(data.results);
        setAllPokemon(data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearchValueChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchValue(value.toLowerCase());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleClear();
  };

  const handleSubmit = () => {
    setFilteredPokemon(
      allPokemon.filter((pokemon) => pokemon.name.includes(searchValue))
    );
  };

  const handleClear = () => {
    setFilteredPokemon(allPokemon);
    setSearchValue("");
  };

  return (
    <>
      <input
        value={searchValue}
        onChange={handleSearchValueChange}
        onKeyDown={handleKeyDown}
        placeholder={"Search Pokemon"}
      />
      <button onClick={handleSubmit}>search</button>
      <button onClick={handleClear}>clear</button>
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
    </>
  );
}
