import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Pagination from './pagination';
import  { filterRows } from './function'

function RenderTable({ columns, data }) {
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleSearch = (value, accessor) => {
    setActivePage(1)
  
    if (value) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]
  
        return updatedFilters
      })
    }
  }

  const handleSort = accessor => {
    setActivePage(1)
    setSort(prevSort => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const filteredRows = filterRows(rows, filters);
  const rowsPerPage = 2;
  const calculatedRows = filteredRows.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column, idxColumn) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                    key={idxColumn}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>

              {/* filter column */}
              <tr>
                {columns.map((column, idx) => {
                  return (
                    <th key={idx}>
                      <input
                        key={`${column.accessor}-search`}
                        type="search"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        onChange={event => handleSearch(event.target.value, column.accessor)}
                      />
                    </th>
                  )
                })}
              </tr>

              {/* sort */}
              <tr>
                {columns.map(column => {
                  const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                      if (sort.order === 'asc') {
                        return '⬆️'
                      }
                      return '⬇️'
                    } else {
                      return '️↕️'
                    }
                  }

                  return (
                    <th key={column.accessor}>
                      <span>{column.label}</span>
                      <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                    </th>
                  )
                })}
              </tr>
            </>            
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={idx}>
                {row.cells.map((cell, idxCell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                      key={idxCell}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <Pagination 
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </>
  );
}

export default function Table({ headersTable, dataTable }) {
  // useMemo with depedency [], to ensure headers isn't recreated on every render
  // don't make many proccess, cause the function passed to useMemo runs during rendering
  const columns = useMemo(() => headersTable, [])

  // useMemo with depedency [data], 
  // only recreated in render phase, if data has changed
  const data = useMemo(() => dataTable, [dataTable])

  return <RenderTable columns={columns} data={data} />
}
