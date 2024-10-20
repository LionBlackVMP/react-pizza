import React from "react";

export const List = React.memo(({ item, isActive, onClick }) => {
  return (
    <li onClick={onClick} className={isActive ? "active" : ""}>
      {item}
    </li>
  );
});
