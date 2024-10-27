import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import "./scss/app.scss";

export const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Outlet context={{ searchValue }} />
      </div>
    </div>
  );
};
