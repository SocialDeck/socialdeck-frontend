import React, { Component } from 'react'
import { Link } from '@reach/router'
import logo from './socialdecklogo.png'

class Home extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return (
      <div className='home'>
        <nav className='navigation'>
          <div className='topRow'>
            <Link className='navLinks' to='/contacts' ><h1>SocialDeck</h1></Link>
            <img className='topLogo' src={logo} alt='logo' />
          </div>

          { !token && <Link className='navLinks' to='/login'>Login</Link>}
          {token && <React.Fragment>
            <Link className='navLinks'to='/contacts/connections'>Connections</Link>
            <Link className='navLinks'to='/my-cards'>My Cards</Link>
            <Link className='navLinks'to='/contacts/new-contact'>New Contact</Link>
            <a className='logOutButton'onClick={() => this.props.logOut()}>Log Out</a>
          </React.Fragment>}
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
