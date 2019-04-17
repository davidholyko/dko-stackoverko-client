import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { postQuestion } from '../api'
import messages from '../messages'

class QuestionCreate extends Component {
  constructor () {
    super()

    this.state = {
      redirect: false,
      title: '',
      summary: '',
      background: '',
      code: '',
      description: '',
      body: '',
      anonymous: false
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onQuestionCreate = event => {
    event.preventDefault()

    const { alert, user } = this.props

    const { summary, background, code, description } = this.state
    const body =
    `${summary}\n
    ${background}\n
    <pre><code className="language-javascript">${code}</code></pre>\n
    ${description}`

    postQuestion(user, { ...this.state, body })
      .then(() => alert(messages.questionCreateSuccess, 'success'))
      .then(() => this.setState({ redirect: true }))
      .catch(() => {
        this.setState({ title: '', body: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { title, summary, background, code, description, redirect } = this.state

    if (redirect) {
      return <Redirect to="/"></Redirect>
    }

    return (
      <form onSubmit={this.onQuestionCreate} className="d-flex flex-column">
        <label htmlFor="title">Title</label>
        <textarea
          required
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="body">Summarize the problem</label>
        <textarea
          required
          name="summary"
          value={summary}
          type="text"
          placeholder="Summarize the problem here"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="background">Provide background including what you&#39;ve already tried</label>
        <textarea
          required
          name="background"
          value={background}
          type="text"
          placeholder="Include any research you've conducted"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="code">Show some code</label>
        <textarea
          required
          name="code"
          value={code}
          type="text"
          placeholder="Share as little code as possible that still produces the same problem"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="description">Describe expected and actual results</label>
        <textarea
          required
          name="description"
          value={description}
          type="text"
          placeholder="Describe expected and actual results"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <button>Create A Question</button>
      </form>
    )
  }
}

export default withRouter(QuestionCreate)
