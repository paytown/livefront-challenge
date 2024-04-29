import { typeColors } from "../../utils/constants";

export default function PokemonType({ type }: { type: string }) {
  const bgColor = typeColors[type];

  return (
    <div
      style={{ backgroundColor: bgColor || "pink" }}
      className="pokemon-type"
    >
      {type}
    </div>
  );
}
