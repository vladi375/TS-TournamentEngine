import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { selectUserLogged } from "../../store/userSlice";
import { ROUTES } from "../../constants/constants";

interface RouteGuardProps {
  element: JSX.Element;
}

const AuthorizedRouteGuard = ({ element }: RouteGuardProps) => {
  const userLoggedIn = useAppSelector(selectUserLogged);
  const location = useLocation();

  if (!userLoggedIn) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ redirectTo: location.pathname }}
      ></Navigate>
    );
  }

  return element;
};

export default AuthorizedRouteGuard;
