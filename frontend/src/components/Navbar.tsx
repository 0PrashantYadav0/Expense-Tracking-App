import { Link } from '@tanstack/react-router'

const Navbar = () => {
  return (
    <div className="px-12 py-4 flex gap-24">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expense
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
  )
}

export default Navbar
