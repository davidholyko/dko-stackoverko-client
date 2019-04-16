import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import QuestionEdit from './QuestionEdit'
import Comments from '../../comments/components/Comments'

const QuestionWrapper = styled.div`
  margin: 1rem;
  background-color: black;
  color: white;
`

class Question extends Component {
  constructor (props) {
    super(props)

    const { question } = this.props

    this.state = {
      deleted: false,
      editable: false,
      question
    }
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteQuestion = () => this.setState({ deleted: true })
  updateQuestion = updatedQuestion => this.setState({ question: updatedQuestion })

  render () {
    const { question, editable, deleted } = this.state
    const { user, alert } = this.props
    const owned = question.creator === user.handle

    const questionEdit = <QuestionEdit
      question={question}
      user={user}
      alert={alert}
      updateQuestion={this.updateQuestion}
      deleteQuestion={this.deleteQuestion}
      unmountEditable={this.unmountEditable}/>

    const editButton = <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>

    if (deleted) { return '' }

    return (
      <QuestionWrapper>
        <h1>ID: {question.id}</h1>
        <h1>TITLE: {question.title}</h1>
        <h1>BODY: {question.body}</h1>
        <h1>ANONYMOUS: {question.anonymous}</h1>
        <h1>CREATOR: {question.creator}</h1>
        <Comments user={user} alert={alert} question={question}/>
        { owned ? editButton : '' }
        { owned && editable ? questionEdit : ''}
      </QuestionWrapper>
    )
  }
}

export default withRouter(Question)
