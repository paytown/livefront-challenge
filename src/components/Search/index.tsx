import { SyntheticEvent, KeyboardEvent } from "react";

type SearchProps = {
  searchValue: string;
  handleValueChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleClear: () => void;
};

export default function Search({
  searchValue,
  handleValueChange,
  handleKeyDown,
  handleSubmit,
  handleClear,
}: SearchProps) {
  return (
    <div>
      <input
        value={searchValue}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        placeholder={"Search Pokemon"}
      />
      <button onClick={handleSubmit}>search</button>
      <button onClick={handleClear}>clear</button>
    </div>
  );
}
