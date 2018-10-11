import React, { Component } from 'react'
import { Link } from '@reach/router'
import logo from './socialdecklogo.png'

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <nav className='navigation'>
          <div className='topRow'>
            <Link className='logo' to='/contacts' ><h1>SocialDeck</h1></Link>
            <img className='topLogo' src={logo} alt='logo' />
          </div>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
