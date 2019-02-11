import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from './Auth/SignOut';

const Navbar = ({ session }) => (
  <nav>
    { session && session.getCurrentUser
      ? <NavbarAuth session={session} />
      : <NavbarUnAuth />
    }
  </nav>
);

const NavbarAuth = ({ session }) => (
  <>
    <ul>
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  </>
)

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/sign-in">Sign In</NavLink>
    </li>
    <li>
      <NavLink to="/sign-up">Sign Up</NavLink>
    </li>
  </ul>
);

export default Navbar;
