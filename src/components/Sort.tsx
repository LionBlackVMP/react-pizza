import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { setSort } from "../redux/slices/sortSlice";
import { generalSelect } from "../redux/selectors";
import { List } from "./List";

export const Sort = () => {
  const { sort, sortTypes } = useAppSelector(generalSelect);
  const [isVisible, setState] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label" onClick={() => setState(!isVisible)}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by: </b>
        <span>{sortTypes[sort]}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((el, index) => (
              <List
                key={index}
                item={el}
                isActive={sort === index}
                onClick={() => {
                  dispatch(setSort(index)); // Устанавливаем тип сортировки через Redux
                  setState(false); // Закрываем меню после выбора
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
