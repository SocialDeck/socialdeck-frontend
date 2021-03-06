import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from '@reach/router'
import { GET_CONTACTS } from '../queries'

class Contacts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searched: props.searched
    }
  }
  stripNumber (number) {
    if (number) {
      return number.replace(/\D+/g, '').replace(/^[01]/, '')
    } else {

    }
  }
  parseAddress (address) {
    if (address) {
      if (address.address1) {
        return address.address1.split(/[ ,]+/).join('+') + ',+' + address.city + ',+' + address.state + '+' + address.postalCode
      } else {
        return address.city + ',+' + address.state + '+' + address.postalCode
      }
    } else {

    }
  }

  updateSearch (e) {
    this.setState({ searchTerm: e.target.value })
  }

  render () {
    const token = window.localStorage.getItem('token')
    const searchTerm = this.state.searchTerm
    return <React.Fragment>{token
      ? <React.Fragment>
        {this.props.searchingStatus && <div className='searchForm'>
          <input className='searchField' type='text' placeholder='Search...' onChange={(e) => this.updateSearch(e)}required />
        </div>}
        <ul className='list' >
          {this.props.searchingStatus
            ? <Query
              query={GET_CONTACTS} variables={{ token: token, search: searchTerm }} pollInterval={500}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>{error} Failed to retrieve contacts, please sign out and sign back in to try again.</p>

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
            : <Query
              query={GET_CONTACTS} variables={{ token: token }} pollInterval={500}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p className='errorMessage' >Failed to retrieve contacts, please sign out and sign back in to try again.</p>

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
                        <div className='list-item__subtitle' > {contact.displayName} {(contact.verified && contact.mutual) && <i className='fas fa-exchange-alt statusIcon' />} {(contact.verified && !contact.mutual) && <i className='fas fa-long-arrow-alt-left statusIcon' />}</div>
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
            </Query>}
        </ul>
      </React.Fragment>

      : <Redirect to='/login' noThrow />
    }
    </React.Fragment>
  }
}
export default Contacts
