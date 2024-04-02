import React from 'react'
import { Route, Routes } from 'react-router'
import Display from './Display'
import Crud from './Crud'
import Update from './Update';

const AllRoutes = () => {
  return (
    <div>
      <div>
        {/* <Router> */}
          <Routes>
            <Route path="/add" element={<Crud />} />
            <Route path="/display" element={<Display />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        {/* </Router> */}
      </div>
    </div>
  )
}

export default AllRoutes
