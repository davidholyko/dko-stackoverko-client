import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import QuestionEdit from './QuestionEdit'
import Comments from '../../comments/components/Comments'
import { showQuestion } from '../api'

const QuestionWrapper = styled.div`
  margin: 1rem;
  background-color: black;
  color: white;
`

class Question extends Component {
  constructor (props) {
    super(props)

    const { question, rendered } = this.props

    this.state = {
      deleted: false,
      editable: false,
      rendered,
      question
    }
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteQuestion = () => this.setState({ deleted: true })
  updateQuestion = updatedQuestion => this.setState({ question: updatedQuestion })

  showOneQuestion = () => {
    const { user } = this.props
    const { id } = this.props.match.params
    showQuestion(user, id)
      // .then(data => { console.log(data); return data })
      .then(responseData => this.setState({ question: responseData.data.question, rendered: true }))
      .then(() => console.log(this.state))
      .catch(console.error)
  }

  componentDidMount () {
    console.log(this.props)
    if (!this.props.match.params.id) { return '' }
    this.showOneQuestion()
  }

  render () {
    const { question, editable, deleted, rendered } = this.state
    const { user, alert } = this.props

    if (!rendered) { return '' }

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
        <Link to={`questions/${question.id}`}><h1>Link to Question {question.id}</h1></Link>
        <Comments user={user} alert={alert} question={question}/>
        { owned ? editButton : '' }
        { owned && editable ? questionEdit : ''}
      </QuestionWrapper>
    )
  }
}

export default withRouter(Question)
