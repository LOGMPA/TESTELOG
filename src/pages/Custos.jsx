import React from 'react'
import CustosGuard from '../components/auth/CustosGuard.jsx'
import Dashboard from './Dashboard.jsx'

export default function Custos() {
  return (
    <CustosGuard>
      <Dashboard />
    </CustosGuard>
  )
}
