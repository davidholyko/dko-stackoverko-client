import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'

import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Question from './questions/components/Question'
import Questions from './questions/components/Questions'
import QuestionCreate from './questions/components/QuestionCreate'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    const { alerts } = this.state

    this.setState({ alerts: [...alerts, { message, type }] })

    setTimeout(() => {
      this.setState({ alerts: [] })
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />

        <main className="container">

          { /* Auth routes */ }
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute path='/sign-out' user={user} render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute path='/change-password' user={user} render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          { /* Questions routes */ }
          <Route exact path='/questions' render={() => (
            <Questions alert={this.alert} user={user} />
          )} />

          <Route path='/questions/:id' render={({ match }) => (
            <Question alert={this.alert} user={user} />
          )} />
          <Route exact path='/question-create' render={() => (
            <QuestionCreate alert={this.alert} user={user} />
          )} />
        </main>

        <div id="footer" className="fixed-bottom d-flex flex-column">
          {alerts.map((alert, index) => (
            <Alert key={index} variant={alert.type} className="animated fadeIn">
              <Alert.Heading>
                {alert.message}
              </Alert.Heading>
            </Alert>
          ))}
        </div>

      </React.Fragment>
    )
  }
}

export default App
