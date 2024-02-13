import React from 'react'
import ReactDOM from 'react-dom/client'

import '../styles/tailwind.css'
import Page from './main/page.jsx';
import Layout from './main/layout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <Page />
    </Layout>
  </React.StrictMode>,
)
