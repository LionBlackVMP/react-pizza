import { useEffect, useState, useCallback } from "react";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Sort } from "../components/Sort";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategories, setActive] = useState(0);
  const [active, setState] = useState(0);

  const fetchData = async (sortType) => {
    try {
      setLoading(true);
      const url = new URL("https://6713e287690bf212c76016d7.mockapi.io/items");

      switch (sortType) {
        case "rating":
          url.searchParams.append("sortby", "rating");
          break;

        case "price":
          url.searchParams.append("sortby", "price");
          break;

        case "alphabet":
          url.searchParams.append("sortby", "title");
          break;
        default:
          break;
      }

      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      sortType !== "alphabet" && data.reverse();

      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sortTypes = ["rating", "price", "alphabet"];
    fetchData(sortTypes[active]);
  }, [active]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories active={activeCategories} setActive={setActive} />
        <Sort active={active} sortChange={setState} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {loading ? (
          [...Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          items.map((el) => <PizzaBlock key={el.id} {...el} />)
        )}
      </div>
    </div>
  );
};
