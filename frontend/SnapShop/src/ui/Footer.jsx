import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className="bg-blue-500 text-white p-4 text-center mt-auto">
      <div>&copy; Copyright | All Rights Reserved</div>
      <div>
        <Link
          to="https://alim1496.github.io/"
          className="hover:underline hover:font-bold opacity-85 hover:opacity-100"
        >
          M A Alim
        </Link>
      </div>
    </footer>
  )
}

export default Footer
