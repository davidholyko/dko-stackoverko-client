import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="selected" exact to="/change-password">Change Password</NavLink>
    <NavLink activeClassName="selected" exact to="/sign-out">Sign Out</NavLink>
    <NavLink activeClassName="selected" exact to="/question-create">Create A Question</NavLink>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="selected" exact to="/sign-up">Sign Up</NavLink>
    <NavLink activeClassName="selected" exact to="/sign-in">Sign In</NavLink>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <NavLink activeClassName="selected" exact to="/questions">Home</NavLink>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <div className="d-flex">
      <h1 className="m-0">Stackoverko</h1>
      <p className="mb-0 mt-auto px-2">When stackoverflow isnt enough...</p>
    </div>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
