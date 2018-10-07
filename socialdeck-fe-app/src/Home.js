import React, { Component } from 'react'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      token: null
    }
    const token = window.localStorage.getItem('token')
    if (token) {
      this.state.token = token
    }
    this.setToken = this.setToken.bind(this)
  }

  setToken (token) {
    this.setState({
      token: token
    })
  }

  render () {
    return (
      <div className='home'>
        <nav className='navigation'>
          <h1>Social Deck</h1>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
