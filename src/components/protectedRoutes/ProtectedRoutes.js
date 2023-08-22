import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ username, children }) => {
  if (!username) {
    return <Navigate to="/" />;
  }

  return children;
};
