import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_CONTACTS } from './queries'

class Contacts extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{ token
      ? <div className='contactsLinks'>

        <div className='contacts-nav'>
          <Link to='connections'>Connections</Link>
          <Link to='/my-cards'>My Cards</Link>
          <Link to='new-contact'>New Contact</Link>
        </div>
        <h2>Contacts</h2>
        <Query
          query={GET_CONTACTS} variables={{ token: window.localStorage.getItem('token') }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.contacts.map((contact, idx) => (
              <Link to={contact.id} key={idx} className='contactsItem' ><i className='fas fa-address-card' /> {contact.personName}</Link>
            ))
          }

          }
        </Query>

      </div>
      : <Redirect to='/login' noThrow />
    }
    </React.Fragment>
  }
}
export default Contacts
