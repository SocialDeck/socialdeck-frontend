import React, { Component } from 'react'
import { Link } from '@reach/router'

class Connections extends Component {
  render () {
    return (
      <React.Fragment>
        <Link to='/contacts'>Contacts List</Link>
        <div>REQUEST NEW CONNECTION</div>
        <div>show way to make new connections here, need mutation to send request to connect with others including token and card you wish to share with connection <button onClick={() => console.log('send request to other User')}>Send Request</button></div>
        <div>ACCEPT REQUESTS FROM OTHERS</div>
        <div>show requests for new connections here, need mutation to accept request and choose which card to share with accepted connection <button onClick={() => console.log('accept connection and add to contacts list')}>Accept Request</button></div>
      </React.Fragment>

    )
  }
}
export default Connections
