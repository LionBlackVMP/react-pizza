import { useState } from "react";
import { List } from "./List";

export const Categories = ({ active, setActive }) => {
  const pizzaTypes = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];
  // const [active, setActive] = useState(0);

  return (
    <div className="categories">
      <ul>
        {pizzaTypes.map((el, index) => (
          <List
            key={index}
            item={el}
            isActive={active === index}
            onClick={() => setActive(index)}
          />
        ))}
      </ul>
    </div>
  );
};
