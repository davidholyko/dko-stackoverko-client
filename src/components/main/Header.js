import React from 'react'
import { NavLink } from 'react-router-dom'
import img from '../../images/icon.png'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="selected" exact to="/change-password">Change Password</NavLink>
    <NavLink activeClassName="selected" exact to="/sign-out">Sign Out</NavLink>
    <NavLink activeClassName="selected" exact to="/question-create">Ask A Question</NavLink>
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
      <img src={img} alt=""/>
      <h1 className="m-0">StackOverKo</h1>
    </div>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
