import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { generalSelect } from "../redux/selectors";
import { setCategory } from "../redux/slices/filterSlice";
import { setSort } from "../redux/slices/sortSlice";
import { setPage } from "../redux/slices/pageSlice";
import { setSearchValue } from "../redux/slices/searchSlice";

export const Home = () => {
  const { sort, sortTypes, category, pizzaTypes, currentPage, searchValue } =
    useSelector(generalSelect);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

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

      const res = await axios.get(url);

      setItems(res.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setItems([]);
        setError("Pizzas not found. Please check your search.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const categoryParam = searchParams.get("category");
    const pageParam = parseInt(searchParams.get("page"));
    const searchParam = searchParams.get("search");

    sortParam && dispatch(setSort(sortTypes.indexOf(sortParam)));
    categoryParam && dispatch(setCategory(pizzaTypes.indexOf(categoryParam)));
    pageParam && dispatch(setPage(pageParam));
    searchParam && dispatch(setSearchValue(searchParam));
  }, [dispatch, searchParams, sortTypes, pizzaTypes]);

  useEffect(() => {
    const params = {};
    params.sort = sortTypes[sort];
    params.category = pizzaTypes[category];
    params.page = currentPage;

    if (searchValue) params.search = searchValue;

    setSearchParams(params);
    fetchData(sortTypes[sort], category, searchValue, currentPage);
  }, [sort, category, searchValue, currentPage, sortTypes, pizzaTypes, setSearchParams]);

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
