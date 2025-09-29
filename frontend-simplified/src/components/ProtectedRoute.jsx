import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    // Not logged in so redirect to signup
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
