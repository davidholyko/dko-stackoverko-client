import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
// import Question from './Question'

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
      // .then(() => alert(messages.questionsReadSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { questions, rendered } = this.state

    if (!rendered) { return <Spinner animation="border"></Spinner> }

    return (
      <div className="my-5 d-flex flex-column-reverse">
        {questions.map((question, index) => <Link key={index} to={`questions/${question.id}`}><p>{question.title}</p></Link>)}
        <h1>Recently Asked Questions</h1>
      </div>
    )
  }
}

export default withRouter(Questions)
