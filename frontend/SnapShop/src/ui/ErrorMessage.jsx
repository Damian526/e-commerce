import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ErrorMessage = ({ error }) => {
  const navigate = useNavigate();
  if (!error) return null;

  const { statusCode, isOperational } = error.response.data.error;
  const message = error.response.data.message;

  return (
    <div
      className="bg-red-700 border-l-4 border-red-900 text-white p-4 mb-4 rounded-lg shadow-md max-w-7xl mx-auto mt-8"
      role="alert"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <strong className="font-bold mr-2">Error {statusCode}:</strong>
          <span className="block sm:inline">{message}</span>
        </div>
        {!isOperational && (
          <p className="text-sm">
            This issue has been logged, and our team is looking into it.
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="bg-white text-red-700 font-bold py-2 px-4 rounded mt-2 hover:bg-red-100 transition duration-200 self-start"
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
};
ErrorMessage.propTypes = {
  error: PropTypes.shape({
    response: PropTypes.shape({
      data: PropTypes.shape({
        message: PropTypes.string.isRequired,
        error: PropTypes.shape({
          statusCode: PropTypes.number.isRequired,
          isOperational: PropTypes.bool,
        }),
      }),
    }),
  }),
};

export default ErrorMessage;
