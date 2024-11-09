import { ChangeEvent, useRef, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { setSearchValue } from "../../redux/slices/searchSlice";
import { generalSelect } from "../../redux/selectors";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import Loupe from "../../assets/icons/Search/loupe.svg?react";
import Cross from "../../assets/icons/Search/cross.svg?react";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [isCleared, setIsCleared] = useState(false);
  const { searchValue } = useAppSelector(generalSelect);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedDispatch = useCallback(
    debounce((value: string) => {
      if (!isCleared) dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCleared(false);
    debouncedDispatch(value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    if (inputRef.current) inputRef.current.value = "";
    debouncedDispatch.cancel();
    setIsCleared(true);
  };

  return (
    <div className={styles.root}>
      <Loupe className={styles.icon} />
      <input
        ref={inputRef}
        defaultValue={searchValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza"
      />
      {searchValue && <Cross onClick={onClickClear} className={styles.clearIcon} />}
    </div>
  );
};
