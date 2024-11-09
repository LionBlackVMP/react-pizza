import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { Roots } from "./components/Roots";

import { store } from "./redux/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Roots} />
    </Provider>
  </StrictMode>
);