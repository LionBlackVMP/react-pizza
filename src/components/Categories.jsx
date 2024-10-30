import { List } from "./List";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";
import { generalSelect } from "../redux/selectors";

export const Categories = () => {
  const { category, pizzaTypes } = useSelector(generalSelect);

  const dispatch = useDispatch();

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
