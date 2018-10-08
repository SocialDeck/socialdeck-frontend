import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { GET_MY_CARDS } from './queries'

class MyCards extends Component {
  render () {
    return (
      <React.Fragment>
        <Link to='/contacts'>Contacts List</Link>
        <Query
          query={GET_MY_CARDS} variables={{ token: window.localStorage.getItem('token') }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.ownedCards.map((card, idx) => (
              <div key={idx} className='card'>
                {card.personName && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {card.personName}</div>}
                {card.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {card.businessName}</div>}
                {card.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> {card.number}</div>}
                {card.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {card.email}</div>}
                {card.address &&
                <div className='address'>
                  <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
                  <div className='addressBlock'>
                    <div className='addressLine line1'> {card.address.address1}</div>
                    <div className='addressLine line2'> {card.address.address2}</div>
                    <div className='addressLine line3'> {card.address.city}, {card.address.state} {card.address.postalCode}</div>
                  </div>
                </div>
                }
              </div>
            ))
          }
          }
        </Query>

        <div>CREATE NEW CARD</div>
        <div className='card'>
          <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> <input type='text' defaultValue='Name' /></div>
          <div className='cardLine'><i className='fas fa-briefcase cardIcon' /><input type='text' defaultValue='Business' /></div>
          <div className='cardLine'><i className='fas fa-phone cardIcon' /> <input type='text' defaultValue='999-999-9999' /></div>
          <div className='cardLine'><i className='fas fa-envelope cardIcon' /> <input type='text' defaultValue='example@example.com' /></div>
          <div className='address'>
            <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
            <div className='addressBlock'>
              <div className='addressLine line1'><input type='text' defaultValue='Address Line 1' /></div>
              <div className='addressLine line2'><input type='text' defaultValue='Address Line 2' /></div>
              <div className='addressLine line3'> <input type='text' defaultValue='City' />, <input type='text' defaultValue='State' /> <input type='text' defaultValue='ZipCode' /></div>
            </div>
          </div>
        </div>
        <button onClick={() => console.log('add my card to GraphQL for storage')}>Add New Card</button>
      </React.Fragment>

    )
  }
}
export default MyCards
