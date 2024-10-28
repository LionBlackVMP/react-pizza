import { List } from "./List";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

export const Categories = () => {
  const pizzaTypes = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];
  const category = useSelector((state) => state.filter.category);
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
