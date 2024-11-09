import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItem, CartItem, removeItem, removeSameItems } from "../../redux/slices/cartSlice";
import { cartSelect } from "../../redux/selectors";

import Plus from "../../assets/icons/Cart/plus.svg?react";
import Minus from "../../assets/icons/Cart/minus.svg?react";
import Cross from "../../assets/icons/Cart/cross.svg?react";

export const ItemCart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(cartSelect);

  interface RenderedItems extends CartItem {
    quantity: number;
    key: string;
    description: string;
  }

  const findItem = ({ id, size, type }: RenderedItems, items: CartItem[]) => {
    return items.find((el) => el.id === id && el.size === size && el.type === type);
  };

  const renderedItems = items
    .reduce((acc: RenderedItems[], item: CartItem) => {
      const existingIndex = acc.findIndex(
        (obj) => obj.id === item.id && obj.size === item.size && obj.type === item.type
      );

      if (existingIndex !== -1) {
        acc[existingIndex].quantity += 1;
      } else {
        acc.push({
          ...item,
          quantity: 1,
          key: item.id + `${item.type}, ${item.size} cm.`,
          description: `${item.type}, ${item.size} cm.`,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => {
      const titleComparison = a.title.localeCompare(b.title);
      if (titleComparison !== 0) {
        return titleComparison;
      }

      return a.key.localeCompare(b.key);
    });
  const handleIncrease = (item: RenderedItems, items: CartItem[]) => {
    try {
      const foundItem = findItem(item, items);

      if (!foundItem) throw new Error("Element wasn't found");

      dispatch(addItem(foundItem));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrease = (item: RenderedItems) => {
    dispatch(removeItem(item));
  };

  const handleRemove = (item: RenderedItems) => {
    dispatch(removeSameItems(item));
  };

  return (
    <div className="content__items">
      {renderedItems.length === 0 ? (
        <div>The cart is empty</div>
      ) : (
        renderedItems.map((item: RenderedItems) => (
          <div key={item.key} className="cart__item">
            <div className="cart__item-img">
              <img className="pizza-block__image" src={item.imageUrl} alt={item.title} />
            </div>
            <div className="cart__item-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="cart__item-count">
              <div
                className="button button--outline button--circle cart__item-count-minus"
                onClick={() => handleDecrease(item)}
              >
                <Minus />
              </div>
              <b>{item.quantity}</b>
              <div
                className="button button--outline button--circle cart__item-count-plus"
                onClick={() => handleIncrease(item, items)}
              >
                <Plus />
              </div>
            </div>
            <div className="cart__item-price">
              <b>{item.price * item.quantity} $</b>
            </div>
            <div className="cart__item-remove" onClick={() => handleRemove(item)}>
              <div className="button button--outline button--circle">
                <Cross />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
