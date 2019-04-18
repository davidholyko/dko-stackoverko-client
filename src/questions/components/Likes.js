// doesnt work right now

import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

class Likes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      question: {},
      likes: [],
      liked: false
    }
  }

  componentDidMount () {
    const { likes, question, user, setupLike } = this.props
    this.setState({ likes, question })
    if (user) { setupLike() }
  }

  render () {
    const { likes, liked } = this.state
    const { user, like, unlike } = this.props

    const likeButton = <button className="btn btn-secondary" onClick={like}>Like</button>
    const unlikeButton = <button className="btn btn-danger" onClick={unlike}>Unlike</button>

    return (
      <Fragment>
        { user ? liked ? unlikeButton : likeButton : '' }
        {!likes.length ? <p>Be the first to like this</p> : ''}
        <p>Liked by: {likes.map((like, index) => <span key={index} className="mx-1">{like.creator}</span>)}</p>
      </Fragment>
    )
  }
}

export default withRouter(Likes)
