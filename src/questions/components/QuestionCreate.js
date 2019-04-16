import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { postQuestion } from '../api'
import messages from '../messages'

class QuestionCreate extends Component {
  constructor () {
    super()

    this.state = {
      title: 'filler title',
      body: 'filler body',
      anonymous: false
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onQuestionCreate = event => {
    event.preventDefault()

    const { alert, user } = this.props

    postQuestion(user, this.state)
      .then(() => alert(messages.signInSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ title: '', body: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { title, body } = this.state

    return (
      <form onSubmit={this.onQuestionCreate}>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={this.handleChange}
        />
        <label htmlFor="body">Body</label>
        <input
          required
          name="body"
          value={body}
          type="text"
          placeholder="Body"
          onChange={this.handleChange}
        />
        <button>Create A Question</button>
      </form>
    )
  }
}

export default withRouter(QuestionCreate)
