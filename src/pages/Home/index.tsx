import {
  SyntheticEvent,
  KeyboardEvent,
  useEffect,
  useState,
  FormEvent,
} from "react";
import fetchData from "../../utils/fetchData";
import Search from "../../components/Search";
import PokemonList from "../../components/PokemonList";
import "./home.scss";

type PokemonListData = {
  name: string;
  url: string;
};

export default function Home() {
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListData[]>([]);
  const [allPokemon, setAllPokemon] = useState<PokemonListData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await fetchData(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );

        setFilteredPokemon(data.results);
        setAllPokemon(data.results);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleValueChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchValue(value.toLowerCase());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleClear(e);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFilteredPokemon(
      allPokemon.filter((pokemon) => pokemon.name.includes(searchValue))
    );
  };

  const handleClear = (e: FormEvent) => {
    e.preventDefault();

    setFilteredPokemon(allPokemon);
    setSearchValue("");
  };

  return (
    <div className="home-wrapper">
      <Search
        searchValue={searchValue}
        handleValueChange={handleValueChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
      <PokemonList filteredPokemon={filteredPokemon} isLoading={isLoading} />
    </div>
  );
}
