import { useRouteError } from "react-router-dom";

import styles from "./NotFound.module.scss";
import { Header } from "../../components/Header";

export const NotFound = () => {
  const error = useRouteError();

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div id="error-page" className={styles.root}>
              <h1>Oops!</h1>
              <div className={styles.description}>
                <h2>Sorry, an unexpected error has occurred.</h2>
                <p className={styles.error}>
                  <i>The page {error.statusText || error.message}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
