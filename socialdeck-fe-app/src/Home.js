import React, { Component } from 'react'
import { Link } from '@reach/router'

class Home extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return (
      <div className='home'>
        <nav className='navigation'>
          <div className='topRow'>
            <h1>Social Deck</h1>
          </div>

          { !token && <Link to='/login'>Login</Link>}
          {token && <React.Fragment>
            <Link to='/contacts/connections'>Connections</Link>
            <Link to='/my-cards'>My Cards</Link>
            <Link to='/contacts/new-contact'>New Contact</Link>
            <a className='logOutButton'onClick={() => this.props.logOut()}>Log Out</a>
          </React.Fragment>}
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
