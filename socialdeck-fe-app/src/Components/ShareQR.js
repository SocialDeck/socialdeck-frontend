import React, { Component } from 'react'
import { Link } from '@reach/router'
import QRCode from 'qrcode-react'

class ShareQR extends Component {
  render () {
    return <React.Fragment>
      <div className='qrPageWrapper card'>
        <div className='qrCodeWrapper'>
          <QRCode className='qrCode' value={'https://socialdeck.xyz/share/' + this.props.cardToken} />
        </div>

        <Link className='formLink' to={'/share/' + this.props.cardToken}>QR Code Link</Link>
      </div>

    </React.Fragment>
  }
}
export default ShareQR
