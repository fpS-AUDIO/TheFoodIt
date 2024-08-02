import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
function PageNotFound() {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate("/");
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.notFound}>😔 PAGE NOT FOUND 404</h2>
      <Button type="cta" onClick={handleButtonClick}>
        go to home page
      </Button>
    </div>
  );
}

export default PageNotFound;
