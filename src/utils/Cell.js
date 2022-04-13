import React, { useEffect, useState } from 'react'
import { Table } from 'rsuite'

function Cell(props) {
  return (
    <Table.Cell
      {...props}
      style={{ padding: 4, display: 'flex', alignItems: 'center' }}
    />
  )
}

export default Cell
