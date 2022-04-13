import React, { useEffect, useState } from 'react'
import { Nav, Modal, Button } from 'rsuite'
import CloseOutlineIcon from '@rsuite/icons/CloseOutline'
import EditIcon from '@rsuite/icons/Edit'
import PlusIcon from '@rsuite/icons/Plus'

function Navbar(props) {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  const remove = () => {
    let selectedItem = JSON.parse(JSON.stringify(props.selectedItem))
    if (props.beforeDelete) {
      selectedItem = props.beforeDelete(selectedItem)
    }

    fetch(props.removeItemUrl + '/' + selectedItem[props.idColumnName], {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.afterDelete) {
          props.afterDelete(response)
        }
        setShowConfirmMessage(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const checkSelectedItem = () => {
    if (Object.keys(props.selectedItem).length == 0) {
      return false
    } else {
      return true
    }
  }

  const renderRemoveModal = () => {
    return (
      <Modal
        open={showConfirmMessage}
        onClose={() => setShowConfirmMessage(false)}
      >
        <Modal.Header>
          <Modal.Title>Uyarı</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kaydı silmek istediğinize emin misiniz?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => remove()} appearance='primary'>
            Evet
          </Button>
          <Button
            onClick={() => setShowConfirmMessage(false)}
            appearance='subtle'
          >
            İptal
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div>
      {renderRemoveModal()}
      <Nav style={{ display: 'flex' }}>
        {props.save && (
          <Nav.Item
            icon={<PlusIcon />}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => props.newForm()}
          >
            Yeni
          </Nav.Item>
        )}
        {props.update && (
          <Nav.Item
            icon={<EditIcon />}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => props.editForm()}
          >
            Düzenle
          </Nav.Item>
        )}
        {props.remove && (
          <Nav.Item
            onClick={() => checkSelectedItem() && setShowConfirmMessage(true)}
            icon={<CloseOutlineIcon />}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Sil
          </Nav.Item>
        )}
      </Nav>
    </div>
  )
}

export default Navbar
