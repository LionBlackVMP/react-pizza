import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import "./scss/app.scss";

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
