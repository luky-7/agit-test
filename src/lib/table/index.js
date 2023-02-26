import React, { useMemo, useState } from 'react';
import Pagination from './pagination';
import  { filterRows, sortRows, paginateRows } from './function'

function RenderTable({ columns, data, rowsPerPage = 5, additionalHeader, additionalColumn }) {
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});

  const handleSearch = (e, column) => {
    const value = e.target.value
    const accessor = column.accessor
    
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

  const filteredRows = useMemo(() => filterRows(data, filters), [data, filters]);
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <>
      <table>
        <thead>
            <>
              {/* title header */}
              <tr>
                {columns?.map((column, idx) => {
                  return (
                    <th key={idx}>
                      {column.label}
                    </th>
                  )
                })}
                <th>{additionalHeader()}</th>
              </tr>

              {/* filter column */}
              <tr>
                {columns?.map((column, idx) => {
                  return (
                    <th key={idx}>
                      <input
                        key={`${column.accessor}-search`}
                        type="search"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        onChange={event => handleSearch(event, column)}
                      />
                    </th>
                  )
                })}
              </tr>

              {/* sort */}
              <tr>
                {columns.map((column, idx) => {
                  const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                      if (sort.order === 'asc') {
                        return '↑'
                      }
                      return '↓'
                    } else {
                      return '️↕'
                    }
                  }

                  return (
                    <th key={idx}>
                      <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                    </th>
                  )
                })}
              </tr>
            </>
        </thead>
        
        <tbody>
          {calculatedRows?.map((row, idx) => {
            return (
              <tr key={idx}>
                {columns.map((column, idxCol) => {
                  return <td key={idxCol}>{row[column.accessor]}</td>
                })}
                <td> {additionalColumn(row.id)} </td>
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

export default function Table({ 
    headersTable, 
    dataTable, 
    rowsPerPage, 
    additionalHeader, 
    additionalColumn 
  }) {
  // useMemo with depedency [], to ensure headers isn't recreated on every render
  // don't make many proccess, cause the function passed to useMemo runs during rendering
  const columns = useMemo(() => headersTable, [])

  // useMemo with depedency [data], 
  // only recreated in render phase, if data has changed
  const data = useMemo(() => dataTable, [dataTable])

  return <RenderTable 
    columns={columns} 
    data={data} 
    rowsPerPage={rowsPerPage}
    additionalHeader={additionalHeader} 
    additionalColumn={additionalColumn} />
}
