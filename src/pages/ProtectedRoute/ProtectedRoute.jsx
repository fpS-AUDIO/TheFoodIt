import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const appLayout = useSelector((store) => store.appLayout);

  // useLocation returns the current location object with current URL
  const location = useLocation();

  // Redirect to home if the user hasn't accepted the privacy notice
  if (!appLayout.isUserAcceptedPrivacy) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
