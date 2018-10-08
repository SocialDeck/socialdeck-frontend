import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from '@reach/router'
import { GET_CARD } from './queries'

class Card extends Component {
  render () {
    console.log(this.props.cardId)
    return (
      <Query
        query={GET_CARD} variables={{ token: window.localStorage.getItem('token'), id: this.props.cardId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          console.log(data.card.address)
          return <React.Fragment>
            <Link to='/contacts'>Contacts List</Link>
            <div className='card'>
              {data.card.personName && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {data.card.personName}</div>}
              {data.card.businessName && <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> {data.card.businessName}</div>}
              {data.card.number && <div className='cardLine'><i className='fas fa-phone cardIcon' /> {data.card.number}</div>}
              {data.card.email && <div className='cardLine'><i className='fas fa-envelope cardIcon' /> {data.card.email}</div>}
              {data.card.address &&
              <div className='address'>
                <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
                <div className='addressBlock'>
                  <div className='addressLine line1'> {data.card.address.address1}</div>
                  <div className='addressLine line2'> {data.card.address.address2}</div>
                  <div className='addressLine line3'> {data.card.address.city}, {data.card.address.state} {data.card.address.postalCode}</div>
                </div>
              </div>
              }
            </div>
          </React.Fragment>
        }}
      </Query>
    )
  }
}
export default Card
