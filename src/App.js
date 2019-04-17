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

// import Alert from 'react-bootstrap/Alert'
import { AlertList } from 'react-bs-notifier'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      timeout: 2000,
      position: 'bottom-right'
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type, headline = '', timeout = 2000) => {
    const newAlert = {
      id: (new Date()).getTime(),
      type: type,
      headline: headline,
      message: message
    }

    this.setState(prevState => ({
      alerts: [...prevState.alerts, newAlert]
    }), () => {
      setTimeout(() => {
        const index = this.state.alerts.indexOf(newAlert)
        if (index >= 0) {
          this.setState(prevState => ({
            // remove the alert from the array
            alerts: [...prevState.alerts.slice(0, index), ...prevState.alerts.slice(index + 1)]
          }))
        }
      }, timeout)
    })
  }

  render () {
    const { alerts, user, timeout, position } = this.state

    return (
      <React.Fragment>
        <Header user={user} />

        <AlertList
          position={position}
          alerts={alerts}
          timeout={timeout}
        />

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

          <Route exact path='/' render={() => (
            <Questions alert={this.alert} user={user} />
          )} />

          <Route exact path='/questions' render={() => (
            <Questions alert={this.alert} user={user} />
          )} />

          <Route exact path='/questions/:id' render={({ match }) => (
            <Question alert={this.alert} user={user} />
          )} />
          <Route exact path='/question-create' render={() => (
            <QuestionCreate alert={this.alert} user={user} />
          )} />
        </main>

        <AlertList
          position={position}
          alerts={alerts}
          timeout={timeout}
        />

      </React.Fragment>
    )
  }
}

export default App
