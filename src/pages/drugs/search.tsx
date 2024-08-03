import React from 'react'
import DrugSearch from '@/components/drug-search'

export default function Search() {
  return (
    <div className="flex flex-col h-full">
      <div className="container max-w-3xl mx-auto pt-52 flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-muted-foreground">
          Find the drugs you need
        </h2>
        <DrugSearch />
      </div>
    </div>
  )
}
