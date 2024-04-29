import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BaseLayout from "./pages/BaseLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import PokemonDetails from "./pages/PokemonDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/pokemon/:id", element: <PokemonDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
