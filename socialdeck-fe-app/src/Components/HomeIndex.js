import React, { Component } from 'react'
import { Link, Redirect } from '@reach/router'

class HomeIndex extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>
      {token && <Redirect to='/contacts' noThrow />}
      <div className='card'>
        <h4>Welcome to SocialDeck!</h4>

        <p>Already have an account? <Link className='formLink' to='/login'>Sign In!</Link></p>
        <p>New to SocialDeck? <Link className='formLink' to='/register'>Register!</Link> </p>

      </div>
    </React.Fragment>
  }
}

export default HomeIndex
