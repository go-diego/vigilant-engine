import {debounce} from 'lodash'
import {useCallback, useMemo, useState} from 'react'

const useSearch = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')

  const debouncedSearchFn = useMemo(
    () =>
      debounce((queryString: string) => {
        setDebouncedSearch(queryString)
      }, 200),
    [],
  )

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value)
      debouncedSearchFn(value)

      if (!value) {
        setSearchText('')
        setDebouncedSearch('')
      }
    },
    [debouncedSearchFn],
  )

  const handleClearSearch = useCallback(() => {
    setSearchText('')
    setDebouncedSearch('')
  }, [])

  return {
    searchText,
    debouncedSearch,
    handleSearch,
    handleClearSearch,
  }
}

export default useSearch
