import React, { Component } from 'react'
import { Link } from '@reach/router'
import QRCode from 'qrcode-react'

class ShareQR extends Component {
  render () {
    return <React.Fragment>
      <Link to='/my-cards'>My Cards</Link>
      <div className='qrWrapper'>
        <QRCode value={'https://socialdeck-3c370.firebaseapp.com/share/' + this.props.cardToken} />
        <Link to={'/share/' + this.props.cardToken}>QR Code Link</Link>
      </div>

    </React.Fragment>
  }
}
export default ShareQR
