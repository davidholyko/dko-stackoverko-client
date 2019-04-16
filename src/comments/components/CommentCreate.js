import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { postComment } from '../api'
import messages from '../messages'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionID: this.props.question_id,
      text: 'filler text',
      anonymous: false
    }
  }

  componentDidMount () {
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onCommentCreate = event => {
    event.preventDefault()

    const { alert, user, question, createComment } = this.props

    postComment(user, this.state, question.id)
      .then(responseData => createComment(responseData.data.comment))
      .then(() => alert(messages.commentCreateSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ text: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { text } = this.state
    const { id } = this.props.question

    return (
      <form onSubmit={this.onCommentCreate} className="d-flex flex-column bg-primary text-light p-3">
        <label htmlFor="text">Comment for Question {id}</label>
        <input
          required
          type="text"
          name="text"
          value={text}
          placeholder="Title"
          onChange={this.handleChange}
        />
        <button>Create A Comment</button>
      </form>
    )
  }
}

export default withRouter(CommentCreate)
