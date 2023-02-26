function convertType(value) {
  console.log('value')
  console.log(value)

  if (typeof value === 'number') {
    return value.toString()
  }

  if (isDateString(value)) {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
  }

  if (typeof value === 'boolean') {
    return value ? '1' : '-1'
  }

  return value
}

export function filterRows(rows, filters) {
  if (filters.length <= 0) return rows

  return rows.filter(row => {
    return Object.keys(filters).every(accessor => {
      const value = row[accessor]
      const searchValue = filters[accessor]

      if (typeof value === 'string') {
        return (value.toLowerCase()).includes(searchValue.toLowerCase())
      }

      if (typeof value === 'boolean') {
        return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
      }

      if (typeof value === 'number') {
        return value == searchValue
      }

      return false
    })
  })
}

export function sortRows(rows, sort) {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort

    if (typeof a[orderBy] === null || 'undefined') return 1
    if (typeof b[orderBy] === null || 'undefined') return -1

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', { numeric: typeof b[orderBy] === 'number' })
    } else {
      return bLocale.localeCompare(aLocale, 'en', { numeric: typeof a[orderBy] === 'number' })
    }
  })
}

export function paginateRows(sortedRows, activePage, rowsPerPage) {
  return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
}

function isDateString(value) {
  console.log('value')
  console.log(value)

  if (typeof value === 'string') return false

  return value.match(/^\d{2}-\d{2}-\d{4}$/)
}