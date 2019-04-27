import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import CommentEdit from './CommentEdit'
import Markdown from 'react-markdown'

const CommentWrapper = styled.div`
  margin: 0.25rem;
  background-color: white;
  color: black;
  padding: 0.5rem 0;
  border-top: 1px solid black;
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
    const { user } = this.props
    const owned = user ? comment.creator === user.handle : false

    const commentEdit = <CommentEdit
      comment={comment}
      user={user}
      deleteComment={this.deleteComment}
      updateComment={this.updateComment}
      unmountEditable={this.unmountEditable}
      value={comment.text}/>

    const editButton = <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>

    if (deleted) { return '' }

    return (
      <CommentWrapper>
        <Markdown source={comment.text} className="break" />
        <div className="d-flex justify-content-end">
          <p className="tag text-dark">{comment.creator}</p>
        </div>
        { owned ? editButton : ''}
        { owned && editable ? commentEdit : ''}
      </CommentWrapper>
    )
  }
}

export default withRouter(Comment)
