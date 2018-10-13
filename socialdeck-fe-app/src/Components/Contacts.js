import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_CONTACTS } from '../queries'

class Contacts extends Component {
  stripNumber (number) {
    if (number) {
      return number.replace(/\D+/g, '').replace(/^[01]/, '')
    } else {

    }
  }
  parseAddress (address) {
    if (address) {
      return address.address1.split(/[ ,]+/).join('+') + ',+' + address.city + ',+' + address.state + '+' + address.postalCode
    } else {

    }
  }
  render () {
    const token = window.localStorage.getItem('token')
    return <React.Fragment>{token
      ? <React.Fragment>
        <form className='searchForm'>
          <input className='searchButton' type='button' value='Search' />
          <input className='searchField' type='text' placeholder='Search...' required />
        </form>
        <ul className='list' >
          <Query
            query={GET_CONTACTS} variables={{ token: token }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(</p>

              return data.contacts.map((contact, idx) => (

                <li key={idx} className='list-item' >
                  <Link to={contact.cardToken} key={idx} className='list-item contact'>
                    <div className='list-item__left' >
                      <div className='list-item__thumbnail monogram' >
                        {contact.name[0]}
                      </div>
                    </div>

                    <div className='list-item__center'>
                      <div className='list-item__title' > {contact.name} </div>
                      <div className='list-item__subtitle' > {contact.displayName} </div>
                    </div>
                  </Link>
                  <div className='list-item__right' >
                    {contact.number && <a href={'tel:' + this.stripNumber(contact.number)}> <i className='fas fa-phone list-item__icon standardIcon' /></a>}
                    {!contact.number && <i className='fas fa-phone list-item__hidden' />}
                    {contact.mobile && <a href={'sms:' + this.stripNumber(contact.number)}> <i className='fas fa-comment-alt list-item__icon standardIcon' /></a>}
                    {!contact.mobile && <i className='fas fa-comment-alt list-item__hidden' />}
                    {contact.address && <a href={'http://maps.apple.com/?address=' + this.parseAddress(contact.address)}><i className='fas fa-directions list-item__icon standardIcon' /></a>}
                    {!contact.address && <i className='fas fa-directions list-item__hidden' />}
                    {contact.email && <a href={'mailto:' + contact.email}><i className='fas fa-envelope list-item__icon standardIcon' /></a>}
                    {!contact.email && <i className='fas fa-envelope list-item__hidden' />}
                  </div>
                </li>

              ))
            }

            }
          </Query>
        </ul>
      </React.Fragment>

      : <Redirect to='/login' noThrow />
    }
    </React.Fragment>
  }
}
export default Contacts
