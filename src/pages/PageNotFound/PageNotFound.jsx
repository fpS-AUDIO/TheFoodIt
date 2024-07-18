import styles from "./PageNotFound.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

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
