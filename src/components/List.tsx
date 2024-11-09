import { FC, memo } from "react";

interface ListProps {
  item: string;
  isActive: boolean;
  onClick: () => void;
}

export const List: FC<ListProps> = memo(({ item, isActive, onClick }) => {
  return (
    <li onClick={onClick} className={isActive ? "active" : ""}>
      {item}
    </li>
  );
});
