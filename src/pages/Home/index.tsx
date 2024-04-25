import { SyntheticEvent, KeyboardEvent, useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import Search from "../../components/Search";
import PokemonList from "../../components/PokemonList";

type PokemonListData = {
  name: string;
  url: string;
};

export default function Home() {
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListData[]>([]);
  const [allPokemon, setAllPokemon] = useState<PokemonListData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await fetchData(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );

        setFilteredPokemon(data.results);
        setAllPokemon(data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchPokemonList();
  }, []);

  const handleValueChange = (e: SyntheticEvent) => {
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
    <div>
      <Search
        searchValue={searchValue}
        handleValueChange={handleValueChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
      <PokemonList filteredPokemon={filteredPokemon} />
    </div>
  );
}
