import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const appWrapper = useSelector(store => store.appWrapper)

  // useLocation returns the current location object with current URL
  const location = useLocation();

  // Redirect to home if the user hasn't accepted the privacy notice
  if (!appWrapper.isUserAcceptedPrivacy) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
