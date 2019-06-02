import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import GoogleMapReact from 'google-map-react'
// import Marker from './Marker'

// const AnyReactComponent = ({ text }) => <div>{text}</div>

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.033711,
      lng: 121.543393,
    },
    zoom: 18,
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <Container
        fluid
        className="p-0 m-0"
        style={{ height: '100%', width: '100%' }}
      >
        <GoogleMapReact
          // bootstrapURLKeys={{ key: 'AIzaSyCNjMMcvnKTcRCOJvpxFe6xgqytgjl0tBI' }}
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {/*<AnyReactComponent lat={25.033711} lng={121.543393} text="資策會" />*/}
          {/*<FontAwesomeIcon*/}
          {/*  icon={faMapPin}*/}
          {/*  size="6x"*/}
          {/*  style={{ color: '#ff0000' }}*/}
          {/*/>*/}
        </GoogleMapReact>
        {/*<Marker lat={this.props.center.lat} lng={this.props.center.lng} />*/}
      </Container>
    )
  }
}

export default SimpleMap
