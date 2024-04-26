import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokemonDetails from "./index";

beforeEach(() => {
  const mockResponse = (
    status: number,
    statusText: string,
    responseData: any
  ) => {
    return new Response(JSON.stringify(responseData), {
      status,
      statusText,
    });
  };

  jest.spyOn(global, "fetch").mockResolvedValue(
    mockResponse(200, "OK", {
      results: {
        name: "Bulbasaur",
        moves: [
          { move: { name: "move1" } },
          { move: { name: "move3" } },
          { move: { name: "move4" } },
          { move: { name: "move5" } },
          { move: { name: "move6" } },
          { move: { name: "move7" } },
        ],
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
        types: [{ type: { name: "grass" } }, { move: { name: "poison" } }],
      },
    })
  );
});

describe("Home component", () => {
  test("renders loading text then the Pokemon's name once data is fetched", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading Pokémon details...")).toBeInTheDocument();

    waitFor(() => {
      expect(
        screen.getByText("Loading Pokémon details...")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("foofoofoo")).not.toBeInTheDocument();
    });
  });

  test("renders the initial moves and a show all moves button if they exceed the limit", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByText("move1")).toBeInTheDocument();
      expect(screen.getByText("move2")).toBeInTheDocument();
      expect(screen.getByText("move3")).toBeInTheDocument();
      expect(screen.getByText("move4")).toBeInTheDocument();
      expect(screen.getByText("move5")).toBeInTheDocument();
      expect(screen.getByText("move6")).toBeInTheDocument();
      expect(screen.getByText("move7")).not.toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Show All Moves" })
      ).toBeInTheDocument();
    });
  });

  test("clicking show all moves button displays all moves and removes button from the dom", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByText("move7")).not.toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Show All Moves" })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Show All Moves" }));

      expect(screen.getByText("move7")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Show All Moves" })
      ).not.toBeInTheDocument();
    });
  });
});
