import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const QuestionEdit = styled.div`
  background-color: green;
  color: white;
`

class Question extends Component {
  constructor () {
    super()

    this.state = {
      editable: false,
      question: {
        title: '',
        body: '',
        anonymous: false
      }
    }
  }

  componentDidMount () {
    const { question } = this.props
    this.setState({ question })
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  handleChange = event => this.setState({ question: { [event.target.name]: event.target.value } })

  render () {
    const { question } = this.state

    return (
      <QuestionEdit>
        <form onSubmit={this.onQuestionUpdate}>
          <label htmlFor="title">Title</label>
          <textarea required type="text" name="title" value={question.title} onChange={this.handleChange}>
            {question.title}
          </textarea>
          <label htmlFor="body">Body</label>
          <textarea required type="text" name="body" value={question.body} onChange={this.handleChange}>
            {question.body}
          </textarea>
          <button>Create A Question</button>
          <button>Delete</button>
        </form>
      </QuestionEdit>
    )
  }
}

export default withRouter(Question)
