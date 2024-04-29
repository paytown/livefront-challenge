import { typeColors } from "../../utils/constants";

export default function PokemonType({ type }: { type: string }) {
  const { hex, isLowContrast } = typeColors[type];

  return (
    <div
      style={{
        backgroundColor: hex || "var(--grey-400)",
        color: isLowContrast ? "#fff" : "var(--off-black)",
      }}
      className="pokemon-type"
    >
      {type}
    </div>
  );
}
