import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { GET_USERS } from './queries'

class Contacts extends Component {
  render () {
    return (
      <div className='contactsLinks'>
        <h2>{this.props.username}'s Contacts</h2>
        <Query
          query={GET_USERS}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.users.map((user, idx) => (
              <Link to='example-card' key={idx} className='contactsItem' ><i className='fas fa-address-card' /> {user.username}</Link>
            ))
          }

          }
        </Query>
      </div>

    )
  }
}
export default Contacts
