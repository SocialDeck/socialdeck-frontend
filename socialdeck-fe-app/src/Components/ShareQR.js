import React, { Component } from 'react'
import { Link } from '@reach/router'
import QRCode from 'qrcode-react'

class ShareQR extends Component {
  share() {
    var text = 'Add text to share with the URL';
    if ('share' in navigator) {
      navigator.share({
        title: "Join SocialDeck",
        text: text,
        url: 'https://socialdeck.xyz/share/' + this.props.cardToken,
      })
    }
  }
  render() {
    return <React.Fragment>
      <div className='qrPageWrapper card'>
        <div className='qrCodeWrapper'>
          <QRCode className='qrCode' value={'https://socialdeck.xyz/share/' + this.props.cardToken} />
        </div>

        <Link className='formLink' to={'/share/' + this.props.cardToken}>QR Code Link</Link>
        <button onClick={() => this.share()}>Share via...</button>
      </div>

    </React.Fragment>
  }
}
export default ShareQR
