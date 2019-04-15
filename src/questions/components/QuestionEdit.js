import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { patchQuestion, deleteQuestion } from '../api'
import messages from '../messages'

const QuestionEdit = styled.div`
  background-color: green;
  color: white;
`

class Question extends Component {
  constructor () {
    super()

    this.state = {
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
    console.log(this.state)
    event.preventDefault()
    const { question } = this.state
    const { user } = this.props
    patchQuestion(user, question)
      .then(data => { console.log(data); return data })
      .catch(error => {
        console.error(error)
        this.setState({ title: '', body: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  onQuestionDelete = () => {
    event.preventDefault()

    const { question } = this.state
    const { user } = this.props
    deleteQuestion(user, question)
      .then(console.log)
      .catch(console.log)
  }

  render () {
    const { question } = this.state

    return (
      <QuestionEdit>
        <form onSubmit={this.onQuestionUpdate}>
          <label htmlFor="title">Title</label>
          <textarea required type="text" name="title" value={question.title} onChange={this.handleChange}>
            {question.title}
          </textarea>
          <label htmlFor="body">Body</label>
          <textarea required type="text" name="body" value={question.body} onChange={this.handleChange}>
            {question.body}
          </textarea>
          <button>Update</button>
          <button onClick={this.onQuestionDelete}>Delete</button>
        </form>
      </QuestionEdit>
    )
  }
}

export default withRouter(Question)
