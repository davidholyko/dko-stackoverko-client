import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import CommentEdit from './CommentEdit'

const CommentWrapper = styled.div`
  margin: 1rem;
  background-color: orange;
  color: white;
`

class Comment extends Component {
  constructor (props) {
    super(props)

    const { comment, question } = this.props

    this.state = {
      questionID: question.id,
      deleted: false,
      editable: false,
      comment
    }
  }

  componentDidMount () {
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteComment = () => this.setState({ deleted: true })
  updateComment = updatedComment => this.setState({ comment: updatedComment })

  render () {
    const { comment, editable, deleted } = this.state
    const { user, question } = this.props
    const owned = user ? comment.creator === user.handle : false

    const commentEdit = <CommentEdit
      comment={comment}
      user={user}
      deleteComment={this.deleteComment}
      updateComment={this.updateComment}
      unmountEditable={this.unmountEditable}/>

    const editButton = <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>

    if (deleted) { return '' }

    return (
      <CommentWrapper>
        <h1>CREATOR: {comment.creator}</h1>
        <h1>TEXT: {comment.text}</h1>
        <h1>ANONYMOUS: {comment.anonymous.toString()}</h1>
        <h1>QUESTION ID: {question.id}</h1>
        { owned ? editButton : ''}
        { owned && editable ? commentEdit : ''}
      </CommentWrapper>
    )
  }
}

export default withRouter(Comment)
