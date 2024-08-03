import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {Inter} from 'next/font/google'
import React from 'react'
import Header from '@/components/header'

const inter = Inter({subsets: ['latin']})

export default function App({Component, pageProps}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <main className={`flex flex-col h-screen ${inter.className}`}>
          <Header />
          <Component {...pageProps} />
        </main>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
