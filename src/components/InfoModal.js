import React from 'react'
import {Button, Header, Divider, Segment, Item} from 'semantic-ui-react'
import AriaModal from 'react-aria-modal'

const InfoModal = ({location, dimmer, open, closeModal, modalActive, activateModal, deactivateModal, getApplicationNode}) => {

  const getPhotoUrl = () => {
    const photo = location.photos.items[0]
    const photoUrl = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
    return photoUrl
  }
  return (
    modalActive ? <AriaModal titleText="demo one"
               onExit={deactivateModal}
               getApplicationNode={getApplicationNode}>
      <Segment id="demo-one-modal" className="info-modal">
        <Item.Group>
          <Item>
            {location.photos && <Item.Image size={'medium'} src={getPhotoUrl()} alt={location.name}/>}
            <Item.Content >
              <Item.Header as={'h1'}>{location.name}</Item.Header>
              <Divider/>
              <Item.Description>
                <Header>Location:</Header>
                <p><strong>Address: </strong>{location.location.address}</p>
                <p><strong>City: </strong>{location.location.city}</p>
                <p><strong>Country: </strong>{location.location.country}</p>
                <Divider/>
                <Button autoFocus onClick={deactivateModal}>Close</Button>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </AriaModal> : false
  )
}

export default InfoModal