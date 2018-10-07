import React, { Component } from 'react'

class ExampleCard extends Component {
  render () {
    return (
      <div className='card'>
        <div className='cardLine'><i className='fas fa-user-circle cardIcon' /> Name</div>
        <div className='cardLine'><i className='fas fa-briefcase cardIcon' /> Business</div>
        <div className='cardLine'><i className='fas fa-phone cardIcon' /> 999-999-9999</div>
        <div className='cardLine'><i className='fas fa-envelope cardIcon' /> example@example.com</div>
        <div className='address'>
          <div className='addressIconWrapper'><i className='fas fa-map-marked cardIcon' /></div>
          <div className='addressBlock'>
            <div className='addressLine line1'> Address Line 1</div>
            <div className='addressLine line2'> Address Line 2</div>
            <div className='addressLine line3'> City, State ZipCode</div>
          </div>
        </div>
      </div>
    )
  }
}
export default ExampleCard
