import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full py-2 md:px-5 lg:px-10 fixed top-0 backdrop-blur-2xl">
      <nav className="flex items-center justify-between">
        <Link to={'/'} className="font-semibold text-xl">TechTales</Link>
        <div className="flex items-center justify-between gap-3 text-sm">
          <NavLink to={'/about'}>About</NavLink>
          <NavLink to={'/auth/login'}>SignIn</NavLink>
          <NavLink to={'/auth/register'} className="bg-teal-800 text-white px-3 py-1 rounded-md">Get Started</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
