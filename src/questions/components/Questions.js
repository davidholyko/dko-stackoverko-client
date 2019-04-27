import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

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
      .then(responseData => this.setState({ questions: responseData.data.questions.sort(this.sortByID), rendered: true }))
      .catch(() => alert(messages.questionFailure, 'danger'))
  }

  render () {
    const { questions, rendered } = this.state

    if (!rendered) { return <Spinner animation="border"></Spinner> }

    return (
      <div className="my-5 d-flex flex-column-reverse">
        {questions.map((question, index) => (
          <Link to={`questions/${question.id}`} className="question-link" key={index}>
            <div className="mini-counts">
              <span>{question.likes.length}</span>
              <span>Likes</span>
            </div>
            <div className="mini-counts">
              <span>{question.comments.length}</span>
              <span>Responses</span>
            </div>
            <div className="d-flex flex-column w-100">
              <p className="mr-auto my-0">{question.title}</p>
              <div className="d-flex">
                <div className="d-flex">
                  {question.tags.split('  ').map((tag, index) => (
                    <p key={tag + index} className="tag">{tag}</p>)
                  )}
                </div>
                <p className="ml-auto my-0">Asked on {question.creation_date}</p>
              </div>
            </div>
          </Link>
        )
        )}
        <h1>Recently Asked Questions</h1>
      </div>
    )
  }
}

export default withRouter(Questions)
