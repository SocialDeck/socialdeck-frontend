import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from '@reach/router'
import { UPDATE_USER } from './queries'

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
            <div className='card'>
              <div className='cardLine'>New Username<input type='text' onChange={(e) => this.updateState(e, 'username')} defaultValue='username' />  </div>
              <div className='cardLine'>New Password<input type='text' onChange={(e) => this.updateState(e, 'newPassword')} defaultValue='new password' />  </div>
              <div className='cardLine'>New Name <input type='text' onChange={(e) => this.updateState(e, 'name')} defaultValue='new name' /></div>
              <div className='cardLine'>New Email<input type='text' onChange={(e) => this.updateState(e, 'email')} defaultValue='new email' /></div>
              <div className='cardLine'>Verify Old Password (required) <input type='text' onChange={(e) => this.updateState(e, 'oldPassword')} defaultValue='' /></div>
              <button onClick={e => {
                updateUser({ variables: {
                  token: token,
                  username: this.state.username,
                  name: this.state.name,
                  oldPassword: this.state.oldPassword,
                  newPassword: this.state.newPassword,
                  email: this.state.email
                } })
                  .then(data => {
                    console.log(data)
                  })
              }}>Update</button>
            </div>

          </React.Fragment>

        )
        }
      </Mutation>
    </React.Fragment>
  }
}
export default UpdateUser
