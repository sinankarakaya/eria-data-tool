import React from 'react'
import {
  Modal,
  Form as ReactSuiteForm,
  Button,
  InputNumber,
  DatePicker,
  SelectPicker
} from 'rsuite'

function Form(props) {
  const [selectData, setSelectData] = React.useState({})
  const [formData, setFormData] = React.useState({})

  React.useEffect(() => {
    if (props.open) {
      if (props.formShowType === 'update') {
        setFormData(JSON.parse(JSON.stringify(props.selectedItem)))
      } else {
        setFormData({})
      }
    } else {
      setFormData({})
    }
  }, [props.open])

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d)
  }

  const onChangeForm = (value, name) => {
    setFormData({ ...formData, [name]: value })
  }

  const getSelectData = (item) => {
    if (!selectData[item.key]) {
      fetch(item.remote)
        .then((response) => response.json())
        .then((response) => {
          setSelectData({ [item.key]: response })
        })
    }
  }

  const submitForm = () => {
    if (props.formShowType === 'create') {
      save()
    } else if (props.formShowType === 'update') {
      update()
    } else {
      props.handleFormClose()
    }
  }

  const save = () => {
    if (props.beforeSave) {
      setFormData(props.beforeSave(formData))
    }
    fetch(props.saveItemUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.afterSave) {
          props.afterSave(response)
        }
        props.handleFormClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const update = () => {
    if (props.beforeUpdate) {
      setFormData(props.beforeUpdate(formData))
    }
    fetch(props.updateItemUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((response) => {
        if (props.afterUpdate) {
          props.afterUpdate(response)
        }
        props.handleFormClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderTextInput = (item) => {
    return (
      <ReactSuiteForm.Group controlId={item.key}>
        <ReactSuiteForm.ControlLabel>{item.label}</ReactSuiteForm.ControlLabel>
        <ReactSuiteForm.Control
          name={item.key}
          value={formData[item.key]}
          onChange={(e) => {
            onChangeForm(e, item.key)
          }}
        />
      </ReactSuiteForm.Group>
    )
  }

  const renderNumberInput = (item) => {
    return (
      <ReactSuiteForm.Group controlId={item.key}>
        <ReactSuiteForm.ControlLabel>{item.label}</ReactSuiteForm.ControlLabel>
        <ReactSuiteForm.Control
          type={'number'}
          name={item.key}
          value={formData[item.key]}
          onChange={(e) => {
            onChangeForm(e, item.key)
          }}
        />
      </ReactSuiteForm.Group>
    )
  }

  const renderDate = (item) => {
    let dateValue = new Date(formData[item.key])
    if (isValidDate(dateValue)) {
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <DatePicker
            block
            name={item.key}
            value={dateValue}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    } else {
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <DatePicker
            block
            name={item.key}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    }
  }

  const renderDateTime = (item) => {
    let dateTimeValue = new Date(formData[item.key])
    if (isValidDate(dateTimeValue)) {
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <DatePicker
            format='yyyy-MM-dd HH:mm:ss'
            block
            name={item.key}
            value={dateTimeValue}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    } else {
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <DatePicker
            format='yyyy-MM-dd HH:mm:ss'
            block
            name={item.key}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    }
  }

  const renderSelect = (item) => {
    if (item.options) {
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <SelectPicker
            block
            name={item.key}
            data={item.options}
            value={String(formData[item.key])}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    } else if (item.remote) {
      getSelectData(item)
      return (
        <ReactSuiteForm.Group controlId={item.key}>
          <ReactSuiteForm.ControlLabel>
            {item.label}
          </ReactSuiteForm.ControlLabel>
          <SelectPicker
            block
            name={item.key}
            data={selectData[item.key] ? selectData[item.key] : []}
            value={String(formData[item.key])}
            onChange={(e) => {
              onChangeForm(e, item.key)
            }}
          />
        </ReactSuiteForm.Group>
      )
    }
  }

  const formDetail = () => {
    return props.row
      .filter((item) => !item.id)
      .map((item) => {
        if (item.type === 'number') {
          return renderNumberInput(item)
        } else if (item.type === 'date') {
          return renderDate(item)
        } else if (item.type === 'dateTime') {
          return renderDateTime(item)
        } else if (item.type === 'select') {
          return renderSelect(item)
        } else {
          return renderTextInput(item)
        }
      })
  }

  const createForm = () => {
    return <ReactSuiteForm fluid>{formDetail()}</ReactSuiteForm>
  }

  return (
    <Modal open={props.open} onClose={() => props.handleFormClose()}>
      <Modal.Header>
        <Modal.Title>Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createForm()}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => submitForm()} appearance='primary'>
          Tamam
        </Button>
        <Button onClick={() => props.handleFormClose()} appearance='subtle'>
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Form
