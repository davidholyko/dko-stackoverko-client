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
  constructor () {
    super()

    this.state = {
      deleted: false,
      editable: false,
      comment: {
        text: '',
        anonymous: false
      }
    }
  }

  componentDidMount () {
    const { comment } = this.props
    this.setState({ comment })
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteComment = () => this.setState({ deleted: true })
  updateComment = updatedComment => this.setState({ comment: updatedComment })

  render () {
    const { comment, editable, deleted } = this.state
    const { user } = this.props

    const commentEdit = <CommentEdit
      comment={comment}
      user={user}
      deleteComment={this.deleteComment}
      updateComment={this.updateComment}
      unmountEditable={this.unmountEditable}/>

    if (deleted) { return '' }

    return (
      <CommentWrapper>
        <h1>{comment.text}</h1>
        <h1>{comment.anonymous}</h1>
        <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>
        { editable ? commentEdit : ''}
      </CommentWrapper>
    )
  }
}

export default withRouter(Comment)
