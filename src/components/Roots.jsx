import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "../pages/NotFound/NotFound";
import { Home } from "../pages/Home";
import { App } from "../App";
import { Cart } from "../pages/Cart";

export const Roots = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      <NotFound />,
    ],
  },
]);
