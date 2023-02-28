import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAppSelector } from "../../hooks/hooks";
import { selectUserIsAdmin } from "../../store/userSlice";

interface RouteGuardProps {
  element: JSX.Element;
}

const AdminRouteGuard = ({ element }: RouteGuardProps) => {
  const isAdmin = useAppSelector(selectUserIsAdmin);

  if (!isAdmin) {
    return <Navigate to={ROUTES.FORBIDDEN} replace></Navigate>;
  }

  return element;
};

export default AdminRouteGuard;
