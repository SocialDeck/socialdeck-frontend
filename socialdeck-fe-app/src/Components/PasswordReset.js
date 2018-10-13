import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { navigate } from '@reach/router'
import { UPDATE_USER } from '../queries'

class PasswordReset extends Component {
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
    return <React.Fragment>
      <Mutation mutation={UPDATE_USER} update={this.logCache}>
        {(updateUser) => (
          <React.Fragment>
            <div className='card'>
              <div className='cardLine'>New Password<input type='password' onChange={(e) => this.updateState(e, 'newPassword')} />  </div>
              <button onClick={e => {
                updateUser({ variables: {
                  token: this.props.token,
                  password: this.state.newPassword
                } })
                  .then(navigate('/contacts'))
              }}>Update</button>
            </div>

          </React.Fragment>

        )
        }
      </Mutation>
    </React.Fragment>
  }
}
export default PasswordReset
