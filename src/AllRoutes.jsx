import React from 'react'
import { Route, Routes } from 'react-router'
import Display from './Display'
import Crud from './Crud'

const AllRoutes = () => {
  return (
    <div>
        <div>
          <Routes>
            <Route path="/add" element={<Crud />} />
            <Route path="/display" element={<Display />} />
          </Routes>
        </div>
    </div>
  )
}

export default AllRoutes