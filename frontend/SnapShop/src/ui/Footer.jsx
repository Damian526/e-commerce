import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-blue-500 text-white p-4 text-center mt-auto">
      <div>&copy; Copyright | All Rights Reserved</div>
      <div>
        <Link
          to="https://github.com/Damian526/e-commerce"
          className="hover:underline hover:font-bold opacity-85 hover:opacity-100"
        >
          Damian Zięba
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
