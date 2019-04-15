import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import QuestionEdit from './QuestionEdit'

const QuestionWrapper = styled.div`
  background-color: black;
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

  render () {
    const { question, editable } = this.state
    const { user } = this.props

    return (
      <QuestionWrapper>
        <h1>{question.title}</h1>
        <h1>{question.body}</h1>
        <h1>{question.anonymous}</h1>
        <h1>{question.creator}</h1>
        <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>
        { editable ? <QuestionEdit question={question} user={user}/> : ''}
      </QuestionWrapper>
    )
  }
}

export default withRouter(Question)
