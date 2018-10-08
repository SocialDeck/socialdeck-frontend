import React, { Component } from 'react'
import { Redirect } from '@reach/router'

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
    const token = window.localStorage.getItem('token')
    return (
      <div className='home'>
        { !token && <Redirect to='/login' noThrow />}
        <nav className='navigation'>
          <h1>Social Deck</h1>
          {this.state.token && <button onClick={() => this.props.logOut()}>Log Out</button>}
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
