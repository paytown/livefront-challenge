import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";

// IDEA:
// Pokedex with search functionality
// Clicking Pokemon opens detail page

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/todo/:id", element: <p>TODO</p> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
