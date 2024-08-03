import React from 'react'
import {Popover, PopoverContent} from '@/components/ui/popover'
import {useGetDrugs, useSpellingSuggestions} from '@/data/rxnorm'
import {PopoverAnchor} from '@radix-ui/react-popover'
import {Input} from './ui/input'
import {SearchIcon} from 'lucide-react'
import {ScrollArea} from './ui/scroll-area'
import Link from 'next/link'
import clsx from 'clsx'
import {Button} from './ui/button'
import useSearch from '@/hooks/useSearch'
import {Skeleton} from './ui/skeleton'

const ListItem = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLLIElement>) => (
  <li
    className={clsx('hover:bg-slate-100 px-4 py-2 text-sm', className)}
    {...rest}
  >
    {children}
  </li>
)

export default function DrugSearch() {
  const [open, setOpen] = React.useState(false)
  const [searchDrugName, setSearchDrugName] = React.useState<string>('')

  const {debouncedSearch, handleSearch, searchText} = useSearch()

  const {data: spellingSuggestionsData, isLoading: isLoadingSuggestions} =
    useSpellingSuggestions(
      {
        name: debouncedSearch,
      },
      {
        enabled: !!debouncedSearch && !searchDrugName,
        retry: false,
      },
    )

  const {data: getDrugsData, isLoading: isLoadingDrugsData} = useGetDrugs(
    {
      name: searchDrugName,
    },
    {
      enabled: !!searchDrugName,
      retry: false,
    },
  )

  const results =
    getDrugsData?.drugGroup?.conceptGroup
      ?.flatMap((g) => g.conceptProperties)
      .filter((g) => g?.rxcui) || []

  const suggestions =
    spellingSuggestionsData?.suggestionGroup?.suggestionList?.suggestion || []

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
    if (searchDrugName) {
      setSearchDrugName('')
    }
  }

  const handleSearchDrugName = (drugName: string) => {
    setSearchDrugName(drugName)
    handleSearch(drugName)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    handleSearchDrugName(suggestion)
  }

  const handleSearchButtonClick = () => {
    handleSearchDrugName(searchText)
  }

  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      handleSearchDrugName(searchText)
    }
  }

  return (
    <Popover open={open || !!searchText} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative w-full">
          <Input
            onKeyDown={handleSearchInputKeyDown}
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search for drugs ... 💊"
            className="w-full h-12 px-4 pr-12 text-lg rounded-lg bg-slate-200 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <Button
            size="icon"
            variant="ghost"
            className=" bg-slate-300 hover:bg-slate-400 p-1 absolute rounded-full top-1/2 right-4 transform -translate-y-1/2 w-8 h-8 text-muted-foreground"
          >
            <SearchIcon onClick={handleSearchButtonClick} className="w-4 h-4" />
          </Button>
        </div>
      </PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(event) => event?.preventDefault()}
        className="w-[--radix-popover-trigger-width] p-0 max-h-[calc(var(--radix-popover-content-available-height)-1rem)]"
      >
        <ScrollArea className="h-[calc(var(--radix-popover-content-available-height)-1rem)]">
          {searchDrugName && (
            <ul>
              <ListItem className="text-slate-500 font-bold sticky top-0 bg-slate-100 border-b border-slate-200">
                Results
              </ListItem>
              {isLoadingDrugsData ? (
                Array.from({length: 5}).map((_, i) => (
                  <Skeleton
                    key={`results-skeleton-${i}`}
                    className="h-6 mb-3 mx-4"
                  />
                ))
              ) : (
                <>
                  {results.length > 0 ? (
                    results.map((result) => (
                      <ListItem key={result?.rxcui}>
                        <Link
                          className="block w-full h-full"
                          href={`/drugs/${result?.rxcui}`}
                        >
                          {result?.name}
                        </Link>
                      </ListItem>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-slate-500">
                      No results found
                    </li>
                  )}
                </>
              )}
            </ul>
          )}

          {results.length === 0 && (
            <ul>
              <ListItem className="text-slate-500 font-bold hover:bg-transparent">
                Suggestions
              </ListItem>
              {isLoadingSuggestions ? (
                Array.from({length: 5}).map((_, i) => (
                  <Skeleton
                    key={`suggestions-skeleton-${i}`}
                    className="h-6 mb-3 mx-4"
                  />
                ))
              ) : (
                <>
                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                      <ListItem
                        role="button"
                        key={suggestion}
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        {suggestion}
                      </ListItem>
                    ))
                  ) : (
                    <ListItem className="text-slate-500 hover:bg-transparent">
                      No suggestions found
                    </ListItem>
                  )}
                </>
              )}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
