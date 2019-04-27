import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { postQuestion } from '../api'
import messages from '../messages'

class QuestionForm extends Component {
  constructor () {
    super()

    this.state = {
      redirect: false,
      title: '',
      summary: '',
      background: '',
      code: '',
      results: '',
      tags: '',
      anonymous: false
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })
  handleAnonymousToggle = () => {
    this.setState({ ...this.state, anonymous: !this.state.anonymous })
    console.log(this.state)
  }

  onQuestionForm = event => {
    event.preventDefault()

    const { alert, user } = this.props

    const { summary, background, code, results } = this.state
    const body =
    `${summary}\n
    ${background}\n
    ${code}\n
    ${results}`

    postQuestion(user, { ...this.state, body })
      .then(() => alert(messages.questionCreateSuccess, 'success'))
      .then(() => this.setState({ redirect: true }))
      .catch(() => {
        this.setState({ title: '', body: '' })
        alert(messages.questionCreateFailure, 'danger')
      })
  }

  render () {
    const { title, summary, background, code, results, redirect, tags, anonymous } = this.state

    if (redirect) {
      return <Redirect to="/"></Redirect>
    }

    return (
      <form className="d-flex flex-column" onSubmit={this.onQuestionForm}>
        <label htmlFor="title">Title of the question</label>
        <textarea
          required
          type="text"
          name="title"
          value={title}
          placeholder="Please write a descriptive, concise title"
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
        <label htmlFor="results">Describe expected and actual results</label>
        <textarea
          required
          name="results"
          value={results}
          type="text"
          placeholder="Describe expected and actual results"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="results">Add some tags</label>
        <textarea
          required
          name="tags"
          value={tags}
          type="text"
          placeholder="Add some tags"
          className=""
          onChange={this.handleChange}
        ></textarea>
        <div className="d-flex">
          <span className="btn btn-info" onClick={this.handleAnonymousToggle}>Post Anonymously</span>
          {anonymous ? <span className="btn btn-success">Yes ✔️</span> : <span className="btn btn-danger">No 🚫</span>}
        </div>
        <input type="submit" className="btn btn-primary" value="Create A Question" />
      </form>
    )
  }
}

export default withRouter(QuestionForm)
