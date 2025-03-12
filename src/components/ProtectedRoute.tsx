import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({
  children,
  requiredSuperuser = false,
  requiredStaff = false, // Add a flag for staff access
}: {
  children: React.ReactNode;
  requiredSuperuser?: boolean;
  requiredStaff?: boolean; // New flag for staff access
}) => {
  const { user, isLoggedIn } = useAuth();

  // Redirect to login if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to unauthorized if the user is not a superuser and superuser access is required
  if (requiredSuperuser && !user?.is_superuser) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Redirect to unauthorized if the user is not staff and staff access is required
  if (requiredStaff && !user?.is_staff) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
