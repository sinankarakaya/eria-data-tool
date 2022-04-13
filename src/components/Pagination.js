import React from 'react'
import { Pagination as RSuitePagination } from 'rsuite'

function Pagination({ total, limit, page, setPage, handleChangeLimit }) {
  return (
    <div style={{ padding: 20 }}>
      <RSuitePagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        maxButtons={5}
        size='xs'
        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
        total={total}
        limitOptions={[10, 20, 30, 40, 50]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  )
}
export default Pagination
