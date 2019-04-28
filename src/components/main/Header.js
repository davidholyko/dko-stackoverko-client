import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import img from '../../images/icon.png'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="selected" exact to="/change-password">Change Password</NavLink>
    <NavLink activeClassName="selected" exact to="/sign-out">Sign Out</NavLink>
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
  <Fragment>
    <div className="header">
      <div className="header-title">
        <img src={img} alt=""/>
        <h2 className="my-0 mx-2">StackOverKo</h2>
      </div>
      <div className="header-links">
        { user && <span>Welcome, {user.handle}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
      </div>
    </div>
    <div className="container text-right my-2">
      { user &&
      <NavLink activeClassName="selected" exact to="/question-create">
        <button className="btn btn-primary">Ask A Question</button>
      </NavLink> }
    </div>
  </Fragment>
)

export default Header
