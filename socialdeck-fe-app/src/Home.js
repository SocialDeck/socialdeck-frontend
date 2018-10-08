import React, { Component } from 'react'
import { Redirect } from '@reach/router'

class Home extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return (
      <div className='home'>
        { !token && <Redirect to='/login' noThrow />}
        <nav className='navigation'>
          <h1>Social Deck</h1>
          {token && <button onClick={() => this.props.logOut()}>Log Out</button>}
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
