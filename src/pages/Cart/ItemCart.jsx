import { useDispatch, useSelector } from "react-redux";

import { addItem, removeItem, removeSameItems } from "../../redux/slices/cartSlice";
import { cartSelect } from "../../redux/selectors";

export const ItemCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelect);

  const findItem = (id, size, type, items) => {
    return items.find((el) => el.id === id && el.size === size && el.type === type);
  };
  const renderedItems = items
    .reduce((acc, item) => {
      const existingIndex = acc.findIndex(
        (obj) => obj.id === item.id && obj.size === item.size && obj.type === item.type
      );

      if (existingIndex !== -1) {
        acc[existingIndex].quantity += 1;
      } else {
        acc.push({
          id: item.id,
          size: item.size,
          type: item.type,
          title: item.title,
          description: `${item.type}, ${item.size} cm.`,
          price: item.price,
          quantity: 1,
          imageUrl: item.imageUrl,
          key: item.id + ` ${item.type}, ${item.size} cm.`,
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
  const handleIncrease = (id, size, type, items) => {
    dispatch(addItem(findItem(id, size, type, items)));
  };

  const handleDecrease = (id, size, type, items) => {
    dispatch(removeItem({ id, size, type }));
  };

  const handleRemove = (id, size, type) => {
    dispatch(removeSameItems({ id, size, type }));
  };

  return (
    <div className="content__items">
      {renderedItems.length === 0 ? (
        <div>The cart is empty</div>
      ) : (
        renderedItems.map((item) => (
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
                onClick={() => handleDecrease(item.id, item.size, item.type, items)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  ></path>
                </svg>
              </div>
              <b>{item.quantity}</b>
              <div
                className="button button--outline button--circle cart__item-count-plus"
                onClick={() => handleIncrease(item.id, item.size, item.type, items)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="cart__item-price">
              <b>{item.price * item.quantity} $</b>
            </div>
            <div
              className="cart__item-remove"
              onClick={() => handleRemove(item.id, item.size, item.type, items)}
            >
              <div className="button button--outline button--circle">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
