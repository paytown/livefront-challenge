import { SyntheticEvent, KeyboardEvent, FormEvent } from "react";
import "./search.scss";

type SearchProps = {
  searchValue: string;
  handleValueChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleClear: (e: FormEvent) => void;
};

export default function Search({
  searchValue,
  handleValueChange,
  handleKeyDown,
  handleSubmit,
  handleClear,
}: SearchProps) {
  return (
    <form className="search-form">
      <input
        type="text"
        value={searchValue}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        placeholder={"Search Pokémon"}
        aria-label={"Search Pokémon"}
      />
      <div className="search-btn-wrapper">
        <button onClick={handleSubmit} className="btn-primary">
          search
        </button>
        <button onClick={handleClear} className="btn-secondary">
          clear
        </button>
      </div>
    </form>
  );
}
