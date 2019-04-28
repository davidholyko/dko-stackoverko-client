import React, { Component } from 'react'
import Typing, { Backspace } from 'react-typing-animation'
import Spinner from 'react-bootstrap/Spinner'

class Loading extends Component {
  render () {
    return (
      <div className="loading-text d-flex">
        <Spinner className="my-auto mx-2" animation="border" />
        <Typing speed={100} loop>
          <span className="text-medium">Loading.....</span>
          <Backspace speed={100} count={12} />
        </Typing>
      </div>
    )
  }
}

export default Loading
