import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from '@reach/router'
import { GET_SUBSCRIBERS, DELETE_CONNECTION, REQUEST_CONNECTION } from '../queries'

class Subscribers extends Component {
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
          query={GET_SUBSCRIBERS} variables={{ token: token }} pollInterval={500}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>{console.log(error)}</p>

            return data.subscribers.map((subscriber, idx) => (

              <li key={idx} className='list-item' >
                <div className='list-item contact'>
                  <div key={idx} className='list-item__left' >
                    <div className='list-item__thumbnail monogram' >
                      {subscriber.user.name[0]}
                    </div>
                  </div>

                  <div className='list-item__center'>
                    <div className='list-item__title' > {subscriber.user.name} </div>
                    <div className='list-item__subtitle' > {subscriber.card.cardName} </div>
                  </div>
                </div>
                <div className='list-item__right' >
                  {!subscriber.mutual && <Mutation mutation={REQUEST_CONNECTION}>
                    {(requestConnection) =>
                      <a className='list-item contact' onClick={() => {
                        requestConnection({ variables: {
                          token: token,
                          userId: subscriber.user.id
                        } })
                          .then(data => this.props.notifySuccess('Request for Connection Sent'))
                      }}><i className='fas fa-user-plus' /></a>
                    }
                  </Mutation>}
                  <Mutation mutation={DELETE_CONNECTION}>
                    {(destroyConnection) =>
                      <a className='list-item contact' onClick={() => {
                        destroyConnection({
                          variables: {
                            token: token,
                            id: subscriber.id
                          }
                        }).then(data => this.props.notifySuccess('Subscriber Removed'))
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
export default Subscribers
