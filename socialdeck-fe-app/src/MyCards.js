import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_MY_CARDS } from './queries'
import CardInfo from './CardInfo'

class MyCards extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return (
      <React.Fragment>
        <Link to='/contacts'>Contacts List</Link>
        {token ? <Query
          query={GET_MY_CARDS} variables={{ token: window.localStorage.getItem('token') }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.ownedCards.map((card, idx) => (
              <div key={idx} className='card'>
                <CardInfo info={card} />
              </div>
            ))
          }
          }
        </Query>
          : <Redirect to='/login' noThrow />
        }

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
