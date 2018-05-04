import React from 'react'
import {compose, withProps} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

const Map = ({center, locations, clickedItem, onMarkerClick}) => {
  // Using react-google-maps googlemap component to render google map
  return (
    <GoogleMap
      defaultZoom={5}
      center={center}>
      {locations.map((mark, index) => {
        // Render markers on the map
        return (
          <Marker key={index} onClick={(event) => onMarkerClick(event, mark.id)}
                  animation={mark.id === clickedItem ? window.google.maps.Animation.BOUNCE : null}
                  position={{lat: mark.location.lat, lng: mark.location.lng}}>

          </Marker>
        )
      })}
    </GoogleMap>
  )
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAaHBe5orHGa0wuVbXKVJboYJzRk9CNMgY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `100%`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap
)(Map)