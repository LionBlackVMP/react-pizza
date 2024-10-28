import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { setPage } from "../../redux/slices/pageSlice";

export const Pagination = () => {
  const dispatch = useDispatch();

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
