import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./index";

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
      results: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    })
  );
});

describe("Home component", () => {
  test("renders Search and PokemonList components which displays pokemon", async () => {
    render(<Home />);

    expect(screen.getByPlaceholderText("Search Pokemon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "clear" })).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).toBeInTheDocument();
      expect(screen.getByText("Venasaur")).toBeInTheDocument();
    });
  });

  test("displays loading message before content loads", async () => {
    render(<Home />);
    expect(screen.getByText("Loading Pokémon...")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Loading Pokémon...")).not.toBeInTheDocument();
    });
  });

  test("filters Pokemon list based on good search input", async () => {
    render(<Home />);
    waitFor(() => expect(screen.getByText("Bulbasaur")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Search Pokemon"), {
      target: { value: "Bulb" },
    });

    waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).not.toBeInTheDocument();
      expect(screen.getByText("Venusaur")).not.toBeInTheDocument();
    });
  });

  test("filters Pokemon list based on good search input even if case does not match", async () => {
    render(<Home />);
    waitFor(() => expect(screen.getByText("Bulbasaur")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Search Pokemon"), {
      target: { value: "bULb" },
    });

    waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).not.toBeInTheDocument();
      expect(screen.getByText("Venusaur")).not.toBeInTheDocument();
    });
  });

  test("filters Pokemon list based on bad search input and displays a fallback when no Pokemon found", async () => {
    render(<Home />);
    waitFor(() => expect(screen.getByText("Bulbasaur")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Search Pokemon"), {
      target: { value: "foo" },
    });

    waitFor(() => {
      expect(screen.getByText("Bulbasaur")).not.toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).not.toBeInTheDocument();
      expect(screen.getByText("Venusaur")).not.toBeInTheDocument();
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
  });

  test("clear search input and resets Pokemon list", async () => {
    render(<Home />);
    waitFor(() => expect(screen.getByText("Bulbasaur")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Search Pokemon"), {
      target: { value: "Bulb" },
    });

    waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).not.toBeInTheDocument();
      expect(screen.getByText("Venusaur")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "clear" }));

    waitFor(() => {
      expect(screen.getByPlaceholderText("Search Pokemon")).toHaveValue("");

      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).toBeInTheDocument();
      expect(screen.getByText("Venusaur")).toBeInTheDocument();
    });
  });

  test("Escape key clears search input and resets Pokemon list", async () => {
    render(<Home />);
    waitFor(() => expect(screen.getByText("Bulbasaur")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Search Pokemon"), {
      target: { value: "Bulb" },
    });

    waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).not.toBeInTheDocument();
      expect(screen.getByText("Venusaur")).not.toBeInTheDocument();
    });

    fireEvent.keyDown(screen.getByPlaceholderText("Search Pokemon"), {
      key: "Escape",
    });

    waitFor(() => {
      expect(screen.getByPlaceholderText("Search Pokemon")).toHaveValue("");

      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).toBeInTheDocument();
      expect(screen.getByText("Venusaur")).toBeInTheDocument();
    });
  });
});
