import React, {Component} from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import {Sidebar, Segment, Responsive, Icon, Container, Header, Loader} from 'semantic-ui-react'
import SidebarList from './SidebarList'
import Map from './Map'
import initialLocations from '../initialData'
import {foursquare} from '../index'
import InfoModal from './InfoModal'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visible: true,
      width: 'thin',
      center: {lat: -7.593208, lng: 111.288889},
      clickedItem: null,
      open: false,
      clickedMarker: {},
      locations: [],
      filtered: [],
      modalActive: false,
      loading: true,
    }
    // bind all methods to this instance
    this.handleFilter = this.handleFilter.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  /*
    After component is mounted loop through initialLocations to get more information about each location
    then set new state for locations and filtered.
  */
  componentDidMount() {
    initialLocations.forEach((location) => {
      foursquare.searchVenues(
        {
          ll: location.ll,
          query: location.query,
          limit: 1
        }
      ).then(({response: {venues}}) => {
        const locations = this.state.locations
        this.setState({
          locations: locations.concat(venues),
          filtered: locations.concat(venues)
        })
      }).finally(() => this.setState({loading: false}))
    })
  }

  // When item is being clicked set clickedItem with locationId to animate the marker of the location
  onItemClick(locationId) {
    // this.setState({clickedItem: locationId})
    this.onMarkerClick(null, locationId)
  }

  /*
    When marker is being clicked get particular location with specific id then set clickedMarker with that location
    and set dimmer/open to true to open the InfoModal component while fetching the location photos asynchronously.
  */
  onMarkerClick(event, markerId) {
    const location = this.state.locations.find((loc) => loc.id === markerId)
    this.setState({clickedMarker: location, dimmer: true, open: true, clickedItem: null , modalActive: true})
    foursquare.getVenuePhotos({venue_id: markerId, limit: 1}).then(({response: {photos}}) => {
      location.photos = photos
      this.setState({clickedMarker: location})
    })
  }

  // Close an opened InfoModal by setting the dimmer/open to false
  closeModal(event) {
    this.setState({dimmer: false, open: false, clickedMarker: {}})
  }

  activateModal = () => {
    this.setState({modalActive: true});
  };

  deactivateModal = () => {
    this.setState({modalActive: false});
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  // Handle filter
  handleFilter(event) {
    const value = event.target.value.toLowerCase()
    if (value.length > 0) {
      const filtered = this.state.locations.filter((loc) => {
        return loc.name.toLowerCase().includes(value) || loc.location.address.toLowerCase().includes(value)
      })
      this.setState({filtered})
    } else {
      this.setState({filtered: this.state.locations})
    }
  }

  // When mouse enter an item component event is being fired to center the marker on the map
  onMouseEnter(event, ll, locationId) {
    this.setState({
      center: ll,
      clickedItem: locationId
    })
  }

  // Toggle sidebar visibility
  toggleVisibility = () => {
    if (this.state.size < 1024) {
      this.setState({visible: !this.state.visible})
    }
  }

  // Handle sidebar visibility on window size is being updated
  handleOnUpdate = (event, data) => {
    data.width > 1024 ? this.setState({visible: true, width: 'wide', size: data.width}) : this.setState({
      visible: false,
      width: 'thin',
      size: data.width
    })
  }

  render() {
    return (
      <div className="App">
        {/* Using react-semantic-ui sidebar component */}
        {this.state.loading ? <Loader active>Loading</Loader> :
          !this.state.locations[0] ?
            <Container textAlign={'center'}>
              <Header className={'error-header'} as={'h1'} size={'huge'} icon>
                <Icon name={'frown'} color={'grey'} size={'massive'}/>
                <Header.Subheader>
                  Foursquare API client error.
                </Header.Subheader>
              </Header>
            </Container> :
            <Sidebar.Pushable as={Segment}>
              <SidebarList locations={this.state.filtered} visible={this.state.visible} width={this.state.width}
                           toggleVisibility={this.toggleVisibility}
                           handleFilter={this.handleFilter}
                           onMouseEnter={this.onMouseEnter}
                           onItemClick={this.onItemClick}/>
              <Sidebar.Pusher className="sidebar-pusher">
                {/* Using react-semantic-ui responsive component for icon toggler visible only on mobile devices */}
                <Responsive maxWidth={1024} fireOnMount onUpdate={this.handleOnUpdate}>
                  <Icon name='bars' className="sidebar-toggler" onClick={this.toggleVisibility} size='large'></Icon>
                </Responsive>
                <Map clickedItem={this.state.clickedItem} onMarkerClick={this.onMarkerClick} center={this.state.center}
                     locations={this.state.filtered}/>
                <InfoModal dimmer={this.state.dimmer} open={this.state.open} activateModal={this.activateModal}
                           deactivateModal={this.deactivateModal}
                           getApplicationNode={this.getApplicationNode}
                           closeModal={this.closeModal}
                           modalActive={this.state.modalActive}
                           location={this.state.clickedMarker}/>
              </Sidebar.Pusher>
            </Sidebar.Pushable>}
      </div>
    );
  }
}

export default App;
