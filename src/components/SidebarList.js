import React from 'react'
import {Sidebar, Menu, Header, Icon, Input, Segment} from 'semantic-ui-react'

class SidebarList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeItem: ''
    }
  }

  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name})
    this.props.toggleVisibility()
    this.props.onItemClick(name)
  }

  render() {
    const {activeItem} = this.state
    return (
      <Sidebar as={Menu} animation='overlay' width='wide' visible={this.props.visible} icon='labeled' vertical>
        <Segment>
          <Input fluid type={'text'} placeholder={'Filter'} onChange={this.props.handleFilter}/>
        </Segment>
        {this.props.locations.map((loc, index) => {
          return (
            <Menu.Item
              key={index}
              className='sidebar-item'
              name={loc.id}
              active={activeItem === loc.id}
              onMouseEnter={(event) => this.props.onMouseEnter(event, {
                lat: loc.location.lat,
                lng: loc.location.lng
              })}
              onClick={this.handleItemClick}
            >
              <Header color='grey' as='h4'><Icon name={'marker'}/>{loc.name}</Header>
              <p>{loc.location.address}</p>
            </Menu.Item>
          )
        })}
      </Sidebar>
    )
  }
}

export default SidebarList