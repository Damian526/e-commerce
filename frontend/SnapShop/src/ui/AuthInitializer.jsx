import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const AuthInitializer = ({ children }) => {
  useAuth();

  return children;
};
export default AuthInitializer;
