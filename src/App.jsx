import './App.css'
import AdsBanner from './Components/AdsBanner'
import MovieDetail from './Components/MovieDetail'
import MovieGrid from './Components/MovieGrid'
import Navbar from './Components/Navbar'
import TopMenu from './Components/TopMenu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MovieContex } from './Utils/Context'
import FilmyZila from './Components/FilmyZila'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MovieContex>
          <TopMenu />
          <AdsBanner />
          <Routes >
            <Route path="/" element={<MovieGrid />} />
            <Route path="page/:id" element={<MovieGrid />} />
            <Route path="allmovie" element={<FilmyZila />} />
          </Routes>
          <Routes >
            <Route path="move-detail/:str" element={<MovieDetail />} />
          </Routes>
          <AdsBanner />
        </MovieContex>
      </BrowserRouter>
    </>
  )
}

export default App
