import { render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import "@testing-library/jest-dom";

beforeEach(() => {
  const mockResponse = (
    status: number,
    statusText: string,
    responseData: any
  ) => {
    return new Response(JSON.stringify(responseData), {
      status,
      statusText,
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  jest.spyOn(global, "fetch").mockResolvedValue(
    mockResponse(200, "OK", {
      results: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    })
  );
});

describe("Home component", () => {
  test("renders Search and PokemonList components", async () => {
    render(<Home />);

    waitFor(() =>
      expect(screen.getByPlaceholderText("Search Pokemon")).toBeInTheDocument()
    );

    waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });
});
