import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List } from "../List";
import { addItem } from "../../redux/slices/cartSlice";
import { cartSelect } from "../../redux/selectors";

export const PizzaBlock = (props) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelect);
  const count = items.filter((el) => el.id === props.id).length;

  const [state, setState] = useState({
    activeSize: 0,
    activeType: 0,
  });

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setPizzaCount = () => {
    dispatch(
      addItem({
        ...props,
        types: state.activeType,
        size: props.sizes[state.activeSize],
        type: ["thin", "traditional"][state.activeType],
      })
    );
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{props.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((el, index) => (
            <List
              key={index}
              item={["thin", "traditional"][el]}
              isActive={state.activeType === index}
              onClick={() => updateState("activeType", index)}
            />
          ))}
        </ul>
        <ul>
          {props.sizes.map((el, index) => (
            <List
              key={index}
              item={el + " cm."}
              isActive={state.activeSize === index}
              onClick={() => updateState("activeSize", index)}
            />
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{props.price} $</div>
        <button onClick={setPizzaCount} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span> Add </span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};
