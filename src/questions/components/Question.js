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
import Markdown from 'react-markdown'

const QuestionWrapper = styled.div`
  border: 2px solid #999;
  padding: 1rem;
  margin: 1rem;
  background-color: white;
  color: #005999;
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

    const bodyBeforeCode = question.body.match(/^([\s\S]*?)<CodeStart>/)[1]
    const code = question.body.match(/<CodeStart>([\s\S]*?)<CodeEnd>/)[1]
    const bodyAfterCode = question.body.match(/<CodeEnd>([\s\S]*?)$/)[1]

    const likedBy = question.likes.length ? 'Liked By' : 'Be the first to like'

    if (deleted) { return '' }

    return (
      <QuestionWrapper>
        <h4>{question.title}</h4>
        <p>{question.anonymous ? 'anonymous' : question.creator}</p>
        <p>{bodyBeforeCode}</p>
        <PrismCode component="pre" className="language-javascript break">{code}</PrismCode>
        <Markdown source={bodyAfterCode} className="break" />

        <p className="d-flex">{likedBy} {question.likes.map((like, index) => <span key={index} className="mx-1">{like.creator}</span>)}</p>
        { user ? liked ? unlikeButton : likeButton : '' }
        { owned ? editButton : '' }
        { owned && editable ? questionEdit : ''}
        <Comments user={user} alert={alert} question={question}/>
      </QuestionWrapper>
    )
  }
}

export default withRouter(Question)
