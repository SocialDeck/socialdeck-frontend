import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_CARD } from './queries'

class Card extends Component {
  render () {
    return (
      <Query
        query={GET_CARD}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return <div className='card'>
            <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {data.card.personName}</div>
            <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {data.card.businessName}</div>
            <div className='cardLine'><i className='fas fa-phone cardIcon' /> {data.card.number}</div>
            <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {data.card.email}</div>
            <div className='address'>
              <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
              <div className='addressBlock'>
                <div className='addressLine line1'> {data.card.address.address1}</div>
                <div className='addressLine line2'> {data.card.address.address2}</div>
                <div className='addressLine line3'> {data.card.address.city}, {data.card.address.state} {data.card.address.postalCode}</div>
              </div>
            </div>
          </div>
        }}
      </Query>
    )
  }
}
export default Card
