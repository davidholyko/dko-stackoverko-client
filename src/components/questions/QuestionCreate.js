import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import AutoComplete from '../autocomplete/AutoComplete'

import { autoCompleteTags } from '../../data/autocomplete/AutoCompleteTags'
import { postQuestion } from '../../api/QuestionsApi'
import messages from '../../data/messages/QuestionsMessages'

class QuestionCreate extends Component {
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
  handleAnonymousToggle = () => this.setState({ ...this.state, anonymous: !this.state.anonymous })

  updateTags = tag => {
    if (!tag) return this.props.alert('Please include a tag from the list', 'danger')

    // set current tags to this.state.tags
    let currentTags = this.state.tags
    // add tag to the string
    currentTags += '  ' + tag
    // change tags
    if (currentTags.substring(0, 2) === '  ') {
      currentTags = currentTags.substring(2, currentTags.length)
    }
    this.setState({ tags: currentTags })
  }

  onQuestionCreate = event => {
    event.preventDefault()

    const { alert, user } = this.props

    postQuestion(user, { question: this.state })
      .then(() => alert(messages.questionCreateSuccess, 'success'))
      .then(() => this.setState({ redirect: true }))
      .catch(() => {
        this.setState({
          title: '',
          summary: '',
          background: '',
          code: '',
          results: '',
          tags: '' })
        alert(messages.questionCreateFailure, 'danger')
      })
  }

  render () {
    const { title, summary, background, code, results, redirect, tags, anonymous } = this.state

    if (redirect) {
      return <Redirect to="/"></Redirect>
    }

    return (
      <form className="d-flex flex-column" onSubmit={this.onQuestionCreate}>
        <label htmlFor="title">Title of the question</label>
        <textarea
          required
          type="text"
          name="title"
          value={title}
          placeholder="Please write a descriptive, concise title"
          maxLength="50"
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
          name="background"
          value={background}
          type="text"
          placeholder="Include any research you've conducted"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="code">Show some code</label>
        <textarea
          name="code"
          value={code}
          type="text"
          placeholder="Share as little code as possible that still produces the same problem"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="results">Describe expected and actual results</label>
        <textarea
          name="results"
          value={results}
          type="text"
          placeholder="Describe expected and actual results"
          className="textarea-body"
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="results">Add some tags</label>
        <div className="d-flex">
          {tags.split('  ').map((tag, index) => <p key={tag + index} className="tag">{tag}</p>)}
        </div>
        <div className="d-flex my-3">
          <AutoComplete suggestions={autoCompleteTags} updateTags={this.updateTags}/>
        </div>
        <div className="d-flex my-3">
          <span className="btn btn-info" onClick={this.handleAnonymousToggle}>Post Anonymously</span>
          {anonymous ? <span className="btn btn-success">Yes ✔️</span> : <span className="btn btn-danger">No 🚫</span>}
        </div>
        <input type="submit" className="btn btn-primary" value="Create A Question" />
      </form>
    )
  }
}

export default withRouter(QuestionCreate)
