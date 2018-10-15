import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
// import { Link } from '@reach/router'
import { UPDATE_USER } from '../queries'
import { navigate } from '@reach/router'

class UpdateUser extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  updateState (e, state) {
    this.setState({
      [state]: e.target.value
    })
  }

  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>
      <Mutation mutation={UPDATE_USER} update={this.logCache}>
        {(updateUser) => (
          <React.Fragment>
            <div className='loginForm'>
              <div className='loginRow'>
                <label htmlFor='username'>New Username</label>
                <input
                  id='username'
                  type='text'
                  onChange={(e) => this.updateState(e, 'username')} />
              </div>
              <div className='loginRow'>
                <label htmlFor='password'>New Password</label>
                <input
                  id='password'
                  type='password'
                  onChange={(e) => this.updateState(e, 'newPassword')} />
              </div>
              <div className='loginRow'>
                <label htmlFor='name'>New Name</label>
                <input
                  id='name'
                  type='text'
                  onChange={(e) => this.updateState(e, 'name')} />
              </div>
              <div className='loginRow'>
                <label htmlFor='email'>New Email</label>
                <input
                  id='email'
                  type='email'
                  onChange={(e) => this.updateState(e, 'email')} />
              </div>
              <a className='buttonSignIn' onClick={e => {
                updateUser({ variables: {
                  token: token,
                  username: this.state.username,
                  name: this.state.name,
                  password: this.state.newPassword,
                  email: this.state.email
                } })
                  .then(navigate('/contacts'))
              }}>Update</a>
            </div>

          </React.Fragment>

        )
        }
      </Mutation>
    </React.Fragment>
  }
}
export default UpdateUser
