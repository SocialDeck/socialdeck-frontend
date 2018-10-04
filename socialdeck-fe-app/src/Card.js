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
            <div>Name</div>
            <div>{data.card.personName}</div>
            <div>Business</div>
            <div>{data.card.businessName}</div>
            <div>Phone: {data.card.number}</div>
            <div>Email: {data.card.email}</div>
            <div>Address:</div>
            <div>{data.card.address.address1}</div>
            <div>{data.card.address.address2}</div>
            <div>{data.card.address.city}, {data.card.address.state} {data.card.address.postalCode}</div>
          </div>
        }}
      </Query>
    )
  }
}
export default Card
