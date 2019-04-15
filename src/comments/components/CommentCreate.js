import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { postComment } from '../api'
import messages from '../messages'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: 'filler text',
      anonymous: false
    }
  }

  componentDidMount () {
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onCommentCreate = event => {
    event.preventDefault()

    const { alert, user, questionID, createComment } = this.props

    postComment(user, this.state, questionID)
      .then(responseData => createComment(responseData.data.comment))
      .then(() => alert(messages.signInSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ text: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { text, id } = this.state

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
