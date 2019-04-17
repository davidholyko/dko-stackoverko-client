import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import QuestionEdit from './QuestionEdit'
import Comments from '../../comments/components/Comments'
import { showQuestion, questionLikeCreate, questionLikeDelete } from '../api'
import messages from '../messages'

import Prism from 'prismjs'
import '../../css/prism-tomorrow.css'
import PrismCode from 'react-prism'

const QuestionWrapper = styled.div`
  margin: 1rem;
  background-color: black;
  color: white;
`

class Question extends Component {
  constructor (props) {
    super(props)

    this.state = {
      liked: false,
      deleted: false,
      editable: false,
      rendered: false,
      question: {
        likes: [],
        comments: [],
        title: '',
        body: ''
      }
    }
  }

  like = () => {
    const { user, alert } = this.props
    const { id } = this.state.question
    this.setState({ liked: !this.state.liked })
    questionLikeCreate(user, id)
      .then(this.showOneQuestion)
      .then(() => alert(messages.questionLikeSuccess, 'success'))
      .catch(() => { alert(messages.questionLikeFailure, 'danger') })
  }

  unlike = () => {
    const { user, alert } = this.props
    const { id } = this.state.question.likes.find(like => like.user_id === user.id)
    this.setState({ liked: !this.state.liked })
    questionLikeDelete(user, id)
      .then(this.showOneQuestion)
      .then(() => alert(messages.questionUnlikeSuccess, 'success'))
      .catch(() => { alert(messages.questionUnlikeFailure, 'danger') })
  }
  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteQuestion = () => this.setState({ deleted: true })
  updateQuestion = updatedQuestion => this.setState({ question: updatedQuestion })

  setupLike = () => {
    const { user } = this.props
    const likedByUser = this.state.question.likes.find(like => like.user_id === user.id)
    if (likedByUser) {
      this.setState({ liked: true })
    } else {
      this.setState({ liked: false })
    }
  }

  showOneQuestion = () => {
    const { user } = this.props
    const { id } = this.props.match.params
    showQuestion(user, id)
      // .then(data => { console.log(data); return data })
      .then(responseData => this.setState({ question: responseData.data.question, rendered: true }))
      // .then(() => console.log(this.state))
      .then(user ? this.setupLike : '')
      .catch(console.error)
  }

  componentDidMount () {
    Prism.highlightAll()
    const { user } = this.props
    if (user) { this.setupLike() }
    this.showOneQuestion()
  }

  render () {
    const { question, editable, deleted, rendered, liked } = this.state
    const { user, alert } = this.props

    if (!rendered) { return '' }

    const owned = user ? question.creator === user.handle : false

    const questionEdit = <QuestionEdit
      question={question}
      user={user}
      alert={alert}
      updateQuestion={this.updateQuestion}
      deleteQuestion={this.deleteQuestion}
      unmountEditable={this.unmountEditable}/>

    const editButton = <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>
    const likeButton = <button className="btn btn-secondary" onClick={this.like}>Like</button>
    const unlikeButton = <button className="btn btn-danger" onClick={this.unlike}>Unlike</button>

    if (deleted) { return '' }

    return (
      <QuestionWrapper>
        <h1>ID: {question.id}</h1>
        <h1>TITLE: {question.title}</h1>
        <h1>BODY: {question.body}</h1>
        <h1>ANONYMOUS: {question.anonymous}</h1>
        <h1>CREATOR: {question.creator}</h1>

        <PrismCode component="pre" className="language-javascript">
          {`const x = 5
        console.log(e)`}
        </PrismCode>

        <h1 className="d-flex">liked by {question.likes.map((like, index) => <span key={index} className="mx-1">{like.creator},</span>)}</h1>
        { user ? liked ? unlikeButton : likeButton : '' }
        { owned ? editButton : '' }
        { owned && editable ? questionEdit : ''}
        <Comments user={user} alert={alert} question={question}/>
      </QuestionWrapper>
    )
  }
}

export default withRouter(Question)
