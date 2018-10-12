import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_SUBSCRIBERS, DELETE_CONNECTION } from '../queries'

class Connections extends Component {
  stripNumber (number) {
    if (number) {
      return number.replace(/\D+/g, '').replace(/^[01]/, '')
    } else {

    }
  }
  parseAddress (address) {
    if (address) {
      return address.address1.replace(' ', '+') + ',+' + address.city + ',+' + address.state + '+' + address.postalCode
    } else {

    }
  }
  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{token
      ? <ul className='list' >
        <Query
          query={GET_SUBSCRIBERS} variables={{ token: token }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.subscribers.map((subscriber, idx) => (

              <li key={idx} className='list-item' >
                <Link to={subscriber.id} key={idx} className='list-item contact'>
                  <div key={idx} className='list-item__left' >
                    <div className='list-item__thumbnail monogram' >
                      {subscriber.user.name[0]}
                    </div>
                  </div>

                  <div className='list-item__center'>
                    <div className='list-item__title' > {subscriber.user.name} </div>
                    <div className='list-item__subtitle' > {subscriber.card.cardName} </div>
                  </div>
                </Link>
                <div className='list-item__right' >
                  <Mutation mutation={DELETE_CONNECTION}>
                    {(destroyConnection) =>
                      <a className='list-item contact' onClick={() => {
                        destroyConnection({ variables: {
                          token: token,
                          id: subscriber.id
                        } })
                      }}><i className='fas fa-user-times' /></a>
                    }
                  </Mutation>
                </div>
              </li>

            ))
          }

          }
        </Query>
      </ul>

      : <Redirect to='/login' noThrow />
    }
    </React.Fragment>
  }
}
export default Connections
