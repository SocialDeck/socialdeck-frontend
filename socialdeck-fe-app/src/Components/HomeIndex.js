import React, { Component } from 'react'
import { Link } from '@reach/router'
import logo from '../socialdecklogo.png'

class HomeIndex extends Component {
  render () {
    return (
      <div className='card'>
        <h4>Welcome to SocialDeck!</h4>

        <p>Already have an account? <Link className='formLink' to='/login'>Sign In!</Link></p>
        <p>New to SocialDeck? <Link className='formLink' to='/register'>Register!</Link> </p>

      </div>
    )
  }
}

export default HomeIndex
