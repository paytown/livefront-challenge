import { render, screen } from "@testing-library/react";
import Home from "./index";
import "@testing-library/jest-dom";

describe("Home component", () => {
  test("renders Search and PokemonList components", async () => {
    render(<Home />);

    // Check if Search component is rendered
    expect(screen.getByPlaceholderText("Search Pokemon")).toBeInTheDocument();

    // Check if PokemonList component is rendered
    await (() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });
});
