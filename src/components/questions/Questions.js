import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import QuestionsFilter from './QuestionsFilter'

import { indexQuestions } from '../../api/QuestionsApi'
import messages from '../../data/messages/QuestionsMessages'

class Questions extends Component {
  constructor () {
    super()

    this.state = {
      rendered: false,
      questions: [],
      filteredQuestions: [],
      filtered: ''
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
        rendered: true }))
      .then(() => this.setState({ filteredQuestions: this.state.questions }))
      .catch(() => alert(messages.questionFailure, 'danger'))
  }

  filter = () => {
    this.setState({ filtered: event.target.value })
    const { filtered, questions } = this.state
    const filteredQuestions = questions.filter(question => question.tags.toLowerCase().includes(filtered.toLowerCase()))
    this.setState({ filteredQuestions })
  }

  render () {
    const renderQuestionCard = question => (
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
    )

    const { filteredQuestions, rendered } = this.state

    if (!rendered) { return <Spinner animation="border"></Spinner> }

    return (
      <Fragment>
        <QuestionsFilter filter={this.filter}/>
        <div className="my-5 d-flex flex-column-reverse">
          {filteredQuestions.map((question, index) => (
            <Link to={`questions/${question.id}`} className="question-link" key={index}>

              <div className="mini-counts">
                <span>{question.likes.length}</span>
                <span>Likes</span>
              </div>

              <div className="mini-counts">
                <span>{question.comments.length}</span>
                <span>Responses</span>
              </div>

              {renderQuestionCard(question)}
            </Link>
          )
          )}
          <h1>Recently Asked Questions</h1>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Questions)
