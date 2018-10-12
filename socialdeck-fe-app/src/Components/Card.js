import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from '@reach/router'
import { FAVORITE_CARD, UNFAVORITE_CARD, GET_CARD } from '../queries'

class Card extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{token
      ? <Query
        query={GET_CARD} variables={{ cardToken: this.props.cardToken, token: token }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
          return <React.Fragment>
            <div className='card'>
              <div className='cardHeader'>
                {data.card.name && <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> {data.card.name}</div>}
                {('favorite' in this.state ? this.state.favorite : data.card.favorite) ? <Mutation mutation={UNFAVORITE_CARD}>
                  {(favorite) =>
                    <a className='formLink' onClick={() => {
                      favorite({
                        variables: {
                          token: token,
                          cardId: data.card.id
                        }
                      }).then(this.setState({
                        favorite: !this.state.favorite
                      }))
                    }}><i className='fas fa-star' /></a>
                  }
                </Mutation> : <Mutation mutation={FAVORITE_CARD}>
                  {(favorite) =>
                    <a className='formLink' onClick={() => {
                      favorite({
                        variables: {
                          token: token,
                          cardId: data.card.id
                        }
                      }).then(this.setState({
                        favorite: !this.state.favorite
                      }))
                    }}><i className='far fa-star' /></a>
                  }
                </Mutation> }
              </div>
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
