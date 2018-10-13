import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from '@reach/router'
import { FAVORITE_CARD, UNFAVORITE_CARD, GET_CARD } from '../queries'
import CardInfo from './CardInfo'

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
            <div className='loginForm'>
              <CardInfo info={data.card} />
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
