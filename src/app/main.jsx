import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cytoscape from 'cytoscape'
import fcose from 'cytoscape-fcose'
import '../styles/tailwind.css'
import Page from './main/page.jsx'
import Layout from './main/layout.jsx'
import { SearchEngine } from '@/app/shared/search.js'

const queryClient = new QueryClient()

Cytoscape.use(fcose)

const searchEngine = new SearchEngine()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Page searchEngine={searchEngine} />
      </Layout>
    </QueryClientProvider>
  </React.StrictMode>,
)
