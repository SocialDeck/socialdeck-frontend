import React, { Component } from 'react'
import { Link } from '@reach/router'
import logo from '../socialdecklogo.png'

class Home extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div className='home'>
        <nav className='navigation'>
          <div className='topRow'>
            <div />
            <div className='logoWrapper'>
              <Link className='logo' to='/contacts' ><h1>SocialDeck</h1></Link>
              <img className='topLogo' src={logo} alt='logo' />
            </div>
            <button className='searchButton' onClick={() => this.props.searching()}>{this.props.searchingStatus ? <i className='fas fa-times' /> : <i className='fas fa-search' />}</button>
          </div>

        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default Home
