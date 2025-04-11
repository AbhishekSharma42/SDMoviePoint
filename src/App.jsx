import { useEffect, useState } from 'react'
import './App.css'
import AdsBanner from './Components/AdsBanner'
import MovieGrid from './Components/MovieGrid'
import Navbar from './Components/Navbar'
import TopMenu from './Components/TopMenu'

function App() {
  return (
    <>
      <Navbar />
      <TopMenu />
      {/* <AdsBanner />
      <MovieGrid />
      <AdsBanner /> */}
    </>
  )
}

export default App
