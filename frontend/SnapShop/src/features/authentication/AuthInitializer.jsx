import { useAuth } from "./useAuth";
import PropTypes from "prop-types";

const AuthInitializer = ({ children }) => {
  useAuth();

  return children;
};

AuthInitializer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthInitializer;
