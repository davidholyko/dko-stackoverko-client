import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class QuestionsFilter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      keyWords: ''
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <form className="d-flex flex-column p-3 bg-warning">
          <label htmlFor="filterQuestions">Filter Questions by tag</label>
          <input type="text" name="filtered" onChange={this.props.filter}/>
        </form>
      </div>
    )
  }
}

export default withRouter(QuestionsFilter)
