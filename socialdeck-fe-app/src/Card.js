import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_CARD } from './queries'

class Card extends Component {
  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{token
      ? <Query
        query={GET_CARD} variables={{ cardToken: this.props.cardToken }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          return <React.Fragment>
            <Link className='formLink' to='/contacts'>Contacts List</Link>
            <div className='card'>
              {data.card.name && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {data.card.name}</div>}
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
      : <Redirect to='/login' noThrow />
    }

    </React.Fragment>
  }
}
export default Card
