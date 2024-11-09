import { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { useSearchParams } from "react-router-dom";

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
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const Home: FC = () => {
  const {
    sort,
    sortTypes,
    category,
    pizzaTypes,
    currentPage,
    searchValue,
    pizzaItems,
    pizzaLoading,
    pizzaError,
  } = useAppSelector(generalSelect);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  interface Params {
    sort: string;
    category: string;
    page: number;
    search?: string;
  }

  const params = useMemo(() => {
    const params: Params = {
      sort: sortTypes[sort],
      category: pizzaTypes[category],
      page: currentPage,
    };

    if (searchValue) params.search = searchValue;

    return params;
  }, [sort, sortTypes, category, pizzaTypes, currentPage, searchValue]);

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");
    const searchParam = searchParams.get("search");

    sortParam && dispatch(setSort(sortTypes.indexOf(sortParam)));
    categoryParam && dispatch(setCategory(pizzaTypes.indexOf(categoryParam)));
    pageParam && dispatch(setPage(parseInt(pageParam)));
    searchParam && dispatch(setSearchValue(searchParam));
  }, [dispatch, searchParams, sortTypes, pizzaTypes]);

  useEffect(() => {
    const urlParams = { ...params, page: params.page.toString() };

    setSearchParams(urlParams);
    dispatch(fetchPizzas({ ...urlParams, category: category }));
  }, [params, category, setSearchParams, dispatch]);

  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzaBlock = pizzaItems.map((el) => <PizzaBlock key={el.id} {...el} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {pizzaLoading ? skeletons : pizzaError ? <p>{pizzaError}</p> : pizzaBlock}
      </div>
      <Pagination />
    </div>
  );
};
