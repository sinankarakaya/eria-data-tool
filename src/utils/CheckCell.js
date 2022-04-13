import React from 'react'
import { Checkbox } from 'rsuite'
import Cell from './Cell'

function CheckCell({ checked, ...props }) {
  return (
    <div style={{ lineHeight: '46px' }}>
      <Checkbox inline checked={checked} style={{ marginLeft: 0 }} />
    </div>
  )
}
export default CheckCell
