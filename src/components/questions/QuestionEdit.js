import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { patchQuestion, deleteQuestion } from '../../api/QuestionsApi'
import messages from '../../data/messages/QuestionsMessages'

const QuestionEdit = styled.div`
  background-color: green;
  color: white;
  display: flex;
  flex-direction: column;
`

class Question extends Component {
  constructor () {
    super()

    this.state = {
      exists: true,
      editable: false,
      question: {
        title: '',
        body: '',
        id: false,
        anonymous: false
      }
    }
  }

  componentDidMount () {
    const { question } = this.props
    this.setState({ question })
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })

  handleChange = event => this.setState({ question: {
    ...this.state.question,
    [event.target.name]: event.target.value }
  })

  onQuestionUpdate = () => {
    event.preventDefault()
    const { question } = this.state
    const { user, updateQuestion, unmountEditable, alert } = this.props
    patchQuestion(user, question)
      .then(unmountEditable)
      .then(() => updateQuestion(question))
      .then(() => alert(messages.questionUpdateSuccess, 'success'))
      .catch(() => {
        this.setState({ title: '', body: '' })
        alert(messages.questionUpdateFailure, 'danger')
      })
  }

  onQuestionDelete = () => {
    event.preventDefault()
    const { question } = this.state
    const { user, alert } = this.props

    deleteQuestion(user, question)
      .then(this.props.deleteQuestion)
      .then(() => alert(messages.questionDeleteSuccess, 'success'))
      .catch(() => alert(messages.questionFailure, 'danger'))
  }

  render () {
    const { question } = this.state

    return (
      <QuestionEdit>
        <form onSubmit={this.onQuestionUpdate} className="d-flex flex-column p-3">
          <label htmlFor="title">Title</label>
          <textarea required type="text" name="title" value={question.title} onChange={this.handleChange}>
            {question.title}
          </textarea>
          <label htmlFor="body">Body</label>
          <textarea required type="text" name="body" value={question.body} onChange={this.handleChange}>
            {question.body}
          </textarea>
          <div className="d-flex justify-content-between w-100">
            <button className="btn btn-success">Update</button>
            <button className="btn btn-danger" onClick={this.onQuestionDelete}>Delete</button>
          </div>
        </form>
      </QuestionEdit>
    )
  }
}

export default withRouter(Question)
