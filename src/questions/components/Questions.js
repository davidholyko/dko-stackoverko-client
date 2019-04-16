import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Question from './Question'

import { indexQuestions } from '../api'
import messages from '../messages'

class Questions extends Component {
  constructor () {
    super()

    this.state = {
      questions: [],
      rendered: false
    }
  }

  componentDidMount () {
    this.onIndexQuestions()
  }

  sortByID = (a, b) => a.id - b.id

  onIndexQuestions = () => {
    const { user, alert } = this.props

    indexQuestions(user)
      .then(responseData => this.setState({
        questions: responseData.data.questions.sort(this.sortByID),
        rendered: true
      }))
      .then(() => alert(messages.questionsReadSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { questions, rendered } = this.state
    const { user, alert } = this.props

    if (!rendered) {
      return <Spinner animation="border"></Spinner>
    }

    return (
      <Fragment>
        {questions.map((question, index) => <Question key={index} alert={alert} question={question} user={user} rendered={true}/>)}
      </Fragment>
    )
  }
}

export default withRouter(Questions)
