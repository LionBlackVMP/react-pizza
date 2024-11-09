import ReactPaginate from "react-paginate";
import { useAppDispatch } from "../../hooks/hooks";

import styles from "./Pagination.module.scss";
import { setPage } from "../../redux/slices/pageSlice";

export const Pagination = () => {
  const dispatch = useAppDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setPage(event.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
