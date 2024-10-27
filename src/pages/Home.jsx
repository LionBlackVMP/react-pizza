import { useEffect, useState } from "react";

import { useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination/Pagination";

export const Home = () => {
  const { searchValue } = useOutletContext(); // Получаем searchValue из контекста
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setcurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setActiveCategory] = useState(0);
  const [sort, setActiveSort] = useState(0);

  const fetchData = async (sortType, category, searchValue, currentPage) => {
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

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      setItems(data);
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

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //   setItemOffset(newOffset);
  // };
  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzaBlock = items.map((el) => <PizzaBlock key={el.id} {...el} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories active={category} setActive={setActiveCategory} />
        <Sort active={sort} setActive={setActiveSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {loading ? skeletons : error ? <p>Error: {error}</p> : pizzaBlock}
      </div>
      <Pagination onPageChange={(number) => setcurrentPage(number)} />
    </div>
  );
};
