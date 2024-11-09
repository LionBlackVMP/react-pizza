import { List } from "./List";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCategory } from "../redux/slices/filterSlice";
import { generalSelect } from "../redux/selectors";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const { category, pizzaTypes } = useAppSelector(generalSelect);

  return (
    <div className="categories">
      <ul>
        {pizzaTypes.map((el, index) => (
          <List
            key={index}
            item={el}
            isActive={category === index}
            onClick={() => dispatch(setCategory(index))}
          />
        ))}
      </ul>
    </div>
  );
};
