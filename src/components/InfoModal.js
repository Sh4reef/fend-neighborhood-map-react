import React from 'react'
import {Modal, Image, Button, Header, Divider} from 'semantic-ui-react'

const InfoModal = ({location, dimmer, open, closeModal}) => {
  const getPhotoUrl = () => {
    const photo = location.photos.items[0]
    const photoUrl = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
    return photoUrl
  }
  return (
    <Modal dimmer={dimmer} open={open} className={'info-modal'}>
      <Modal.Header>{location.name}</Modal.Header>
      <Modal.Content image>
        {location.photos && <Image wrapped size={'medium'} src={getPhotoUrl()} alt={location.name}/>}
        {location.location &&
        <Modal.Description>
          <Header>Location:</Header>
          <p><strong>Address: </strong>{location.location.address}</p>
          <p><strong>City: </strong>{location.location.city}</p>
          <p><strong>Country: </strong>{location.location.country}</p>
          <Divider/>
        </Modal.Description>}
      </Modal.Content>
      <Modal.Actions>
        <Button color={'grey'} onClick={closeModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default InfoModal