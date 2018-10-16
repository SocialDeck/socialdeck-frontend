import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect, navigate } from '@reach/router'
import { GET_CARD, GET_MY_CARDS, BRIDGE_CONNECTION } from '../queries'
import CardInfo from './CardInfo'

class Card extends Component {
  constructor () {
    super()
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value)
    console.log(this.state.value)
    this.setState({ value: event.target.value });
  }

  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{token
      ? <Query
        query={GET_CARD} variables={{ cardToken: this.props.cardToken, token: token }}
        // pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>
         
          return <React.Fragment>
            <div className='loginForm'>

              <CardInfo info={data.card} />
            </div>
            {!data.card.mutual
              &&
              <div className='loginForm'>
                Complete the connection. Share a card with {data.card.name}
                <select value={this.state.value} onChange={this.handleChange}>
                <option value='' >-- Select Card -- </option>
                  <Query
                    query={GET_MY_CARDS} variables={{ token: token }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <option>Loading...</option>
                      if (error) return <option>Error :(</option>

                      return data.ownedCards.map((card, idx) => (
                        <option key={idx} value={card.cardToken} >{card.cardName}</option>
                      ))

                    }
                    }
                  </Query>
                </select>
              <Mutation mutation={BRIDGE_CONNECTION}>
                {(bridgeConnection) =>
                    <a className='buttonSignIn' onClick={() => {
                      bridgeConnection({
                        variables: {
                          token: token,
                          userId:  data.card.user.id,
                          cardToken: this.state.value
                        }
                      }).then(navigate('/contacts/subscribers/'))
                        
                  }}>Connect{console.log(data.card)}</a>
                  }
                </Mutation>
              </div>
            }
          </React.Fragment>
        }}
      </Query>
      : <Redirect to='/login' noThrow />
    }


    </React.Fragment>

  }
}
export default Card
