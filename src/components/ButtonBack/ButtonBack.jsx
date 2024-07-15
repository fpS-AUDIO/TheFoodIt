import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      type={"back"}
      onClick={(e) => {
        // preventing default behavior to not make sumbit the form
        e.preventDefault();
        // using programmatic navigation to return back (useNavigate hook)
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
