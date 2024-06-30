import { Navigate, useLocation } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";

function ProtectedRoute({ children }) {
  const { isUserAcceptedPrivacy } = useMainContext();
  // useLocation returns the current location object with current URL
  const location = useLocation();

  // Redirect to home if the user hasn't accepted the privacy notice
  if (!isUserAcceptedPrivacy) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
