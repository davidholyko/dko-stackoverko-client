import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { patchComment, deleteComment } from '../api'
import messages from '../messages'

const CommentEditWrapper = styled.div`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
`

class CommentEdit extends Component {
  constructor () {
    super()

    this.state = {
      exists: true,
      editable: false,
      comment: {
        text: '',
        id: false,
        anonymous: false
      }
    }
  }

  componentDidMount () {
    const { comment } = this.props
    this.setState({ comment })
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })

  handleChange = event => this.setState({ comment: {
    ...this.state.comment,
    [event.target.name]: event.target.value }
  })

  onCommentUpdate = () => {
    event.preventDefault()
    const { comment } = this.state
    const { user, updateComment, unmountEditable } = this.props
    patchComment(user, comment)
      // .then(data => { console.log(data); return data })
      .then(unmountEditable)
      .then(() => updateComment(comment))
      .catch(error => {
        console.error(error)
        this.setState({ title: '', body: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  onCommentDelete = () => {
    event.preventDefault()

    const { comment } = this.state
    const { user } = this.props
    deleteComment(user, comment)
      .then(this.props.deleteComment)
      .catch(console.log)
  }

  render () {
    const { comment } = this.state

    return (
      <CommentEditWrapper>
        <form onSubmit={this.onCommentUpdate} className="d-flex flex-column p-3">
          <label htmlFor="title">Comment Text</label>
          <textarea required type="text" name="text" value={comment.text} onChange={this.handleChange}/>
          <div className="d-flex justify-content-between w-100">
            <button className="btn btn-success">Update</button>
            <button className="btn btn-danger" onClick={this.onCommentDelete}>Delete</button>
          </div>
        </form>
      </CommentEditWrapper>
    )
  }
}

export default withRouter(CommentEdit)
