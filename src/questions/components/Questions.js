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

  onIndexQuestions = () => {
    const { user, alert } = this.props

    indexQuestions(user)
      .then(data => { console.log(data); return data })
      .then(responseData => this.setState({ questions: responseData.data.questions, rendered: true }))
      .then(() => alert(messages.signInSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { questions, rendered } = this.state

    if (!rendered) {
      return <Spinner animation="border"></Spinner>
    }

    return (
      <Fragment>
        {questions.map((question, index) => <Question key={index} question={question}/>)}
      </Fragment>
    )
  }
}

export default withRouter(Questions)
