import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_USERS } from './queries'

class Contacts extends Component {
  render () {
    return (
      <Query
        query={GET_USERS}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return data.users.map((user, idx) => (
            <a key={idx} className='contactsItem'
              onClick={() => console.log('open app to card view for', user.username)}>
              <i className='fas fa-address-card' /> {user.username}</a>
          ))
        }}
      </Query>
    )
  }
}
export default Contacts
