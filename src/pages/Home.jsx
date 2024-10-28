import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";

export const Home = () => {
  const { sort, category, currentPage, searchValue } = useSelector((state) => ({
    sort: state.sort.sort,
    category: state.filter.category,
    currentPage: state.page.current,
    searchValue: state.search.value,
  }));

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (sortType, category, searchValue, currentPage) => {
    try {
      const url = new URL("https://6713e287690bf212c76016d7.mockapi.io/items");
      setLoading(true);

      switch (sortType) {
        case "rating":
          url.searchParams.append("sortby", "rating");
          break;

        case "price":
          url.searchParams.append("sortby", "price");
          break;

        case "alphabet":
          url.searchParams.append("sortby", "title");
          url.searchParams.append("order", "asc");
          break;
        default:
          break;
      }
      url.searchParams.append("limit", 4);
      url.searchParams.append("page", currentPage);
      category && url.searchParams.append("category", category);
      searchValue && url.searchParams.append("search", searchValue);

      const res = await fetch(url);

      if (res.status === 404) {
        setItems([]);
        setError("Pizzas not found. Please check your search.");
        return;
      }
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sortTypes = ["rating", "price", "alphabet"];

    fetchData(sortTypes[sort], category, searchValue, currentPage);
  }, [sort, category, searchValue, currentPage]);

  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzaBlock = items.map((el) => <PizzaBlock key={el.id} {...el} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {loading ? skeletons : error ? <p>{error}</p> : pizzaBlock}
      </div>
      <Pagination />
    </div>
  );
};
