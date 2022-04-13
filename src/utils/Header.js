import React, { useEffect, useState } from 'react'
import { Table } from 'rsuite'

const CompactHeaderCell = (props) => (
  <Table.HeaderCell
    {...props}
    style={{
      padding: 4,
      backgroundColor: 'gray',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      display: 'flex',
      ...props.style
    }}
  />
)

function Header(props) {
  return <CompactHeaderCell {...props}>{props.label}</CompactHeaderCell>
}

export default Header
