import React from 'react'
import EasyTable from './components/EasyTable'

export const EriaTable = ({
  data,
  row,
  onRowClick,
  save,
  update,
  remove,
  pagination,
  remotePagination,
  listItemUrl,
  saveItemUrl,
  updateItemUrl,
  removeItemUrl,
  totalPageCountUrl,
  beforeSave,
  afterSave,
  beforeUpdate,
  afterUpdate,
  beforeDelete,
  afterDelete
}) => {
  const ref = React.useRef(null)
  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [])

  return (
    <div style={{ height: '100%' }} ref={ref}>
      {height > 0 ? (
        <EasyTable
          data={data}
          row={row}
          onRowClick={onRowClick}
          save={save}
          update={update}
          remove={remove}
          pagination={pagination}
          remotePagination={remotePagination}
          listItemUrl={listItemUrl}
          totalPageCountUrl={totalPageCountUrl}
          saveItemUrl={saveItemUrl}
          updateItemUrl={updateItemUrl}
          removeItemUrl={removeItemUrl}
          beforeSave={beforeSave}
          afterSave={afterSave}
          beforeUpdate={beforeUpdate}
          afterUpdate={afterUpdate}
          beforeDelete={beforeDelete}
          afterDelete={afterDelete}
          height={height}
        ></EasyTable>
      ) : null}
    </div>
  )
}
