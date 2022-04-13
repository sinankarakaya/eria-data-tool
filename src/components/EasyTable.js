import React, { useEffect, useState, useRef } from 'react'
import { Table } from 'rsuite'
import Header from '../utils/Header'
import Cell from '../utils/Cell'
import CheckCell from '../utils/CheckCell'
import Navbar from './Navbar'
import Form from './Form'
import Pagination from './Pagination'
import 'rsuite/dist/rsuite.min.css'

function EasyTable(props) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [bordered, setBordered] = React.useState(false)
  const [showHeader, setShowHeader] = React.useState(true)
  const [hover, setHover] = React.useState(true)
  const [showForm, setShowForm] = React.useState(false)
  const [formShowType, setFormShowType] = React.useState('create')
  const [selectedItem, setSelectedItem] = React.useState({})
  const [idColumnName, setIdColumnName] = React.useState('')
  const [total, setTotal] = React.useState(
    props.pagination && !props.remotePagination ? props.data.length : 0
  )
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    getIdColumn()
    prepareData()
  }, [])

  React.useEffect(() => {
    prepareData()
  }, [page, limit])

  const prepareData = () => {
    if (props.data) {
      let data = JSON.parse(JSON.stringify(props.data))
      if (props.pagination && !props.remotePagination) {
        data = data.slice(
          (page - 1) * limit,
          page * limit > total ? total : page * limit
        )
      }
      setData(data)
    } else {
      let dataUrl = props.listItemUrl
      let countUrl = props.totalPageCountUrl
      if (props.remotePagination) {
        fetch(countUrl)
          .then((res) => res.json())
          .then((response) => {
            setTotal(response.totalCount)
          })
          .catch((err) => {
            console.log(err)
          })

        fetch(dataUrl + '?page=' + page + '&limit=' + limit)
          .then((res) => res.json())
          .then((response) => {
            setData(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  const handleOpen = (type) => {
    setFormShowType(type)
    setShowForm(true)
  }

  const getIdColumn = () => {
    let idColumn = props.row.find((column) => column.id)
    setIdColumnName(idColumn.key)
  }

  const renderRows = () => {
    return props.row.map((column) => {
      const { key, label, ...rest } = column
      return (
        <Table.Column {...rest} key={key}>
          <Header label={label} />
          {column.render ? (
            <Cell>
              {(rowData) => {
                return column.render(rowData)
              }}
            </Cell>
          ) : (
            <Cell dataKey={key} />
          )}
        </Table.Column>
      )
    })
  }

  const renderNavbar = () => {
    return (
      <Navbar
        newForm={() => handleOpen('create')}
        editForm={() => handleOpen('update')}
        selectedItem={selectedItem}
        idColumnName={idColumnName}
        save={props.save}
        update={props.update}
        remove={props.remove}
        removeItemUrl={props.removeItemUrl}
        beforeDelete={props.beforeDelete}
        afterDelete={props.afterDelete}
      />
    )
  }

  const renderForm = () => {
    return (
      <Form
        handleFormClose={() => setShowForm(false)}
        open={showForm}
        selectedItem={selectedItem}
        formShowType={formShowType}
        beforeSave={props.beforeSave}
        afterSave={props.afterSave}
        beforeUpdate={props.beforeUpdate}
        afterUpdate={props.afterUpdate}
        saveItemUrl={props.saveItemUrl}
        updateItemUrl={props.updateItemUrl}
        row={props.row}
      />
    )
  }

  const renderTable = () => {
    return (
      <Table
        height={props.height}
        loading={loading}
        hover={hover}
        showHeader={showHeader}
        data={data}
        bordered={bordered}
        cellBordered={bordered}
        onRowClick={(data) => {
          setSelectedItem(data)
          props.onRowClick(data)
        }}
      >
        <Table.Column width={50} align='center'>
          <Header
            style={{ padding: 0, display: 'flex', justifyContent: 'center' }}
          />
          <Cell>
            {(rowData) => {
              let selected = false
              if (selectedItem[idColumnName] === rowData[idColumnName]) {
                selected = true
              }
              return <CheckCell checked={selected} />
            }}
          </Cell>
        </Table.Column>
        {renderRows()}
      </Table>
    )
  }

  const renderPagination = () => {
    return (
      props.pagination && (
        <Pagination
          limit={limit}
          page={page}
          total={total}
          setPage={(_page) => {
            setPage(_page)
          }}
          handleChangeLimit={(_limit) => {
            setPage(1)
            setLimit(_limit)
          }}
        />
      )
    )
  }

  return (
    <div>
      {renderNavbar()}
      {renderForm()}
      {renderTable()}
      {renderPagination()}
    </div>
  )
}

export default EasyTable
