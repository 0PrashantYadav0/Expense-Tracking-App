import { Link } from '@tanstack/react-router'

const Navbar = () => {
  return (
    <div className='flex justify-between py-4 px-8 items-center'>
      <Link to="/" className="[&.active]:font-bold">
        <h1 className='font-bold text-2xl'>Expense Tracker</h1>
      </Link>
      <div className='flex gap-8'>
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
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  )
}

export default Navbar
