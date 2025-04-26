import './App.css'
import AdsBanner from './Components/AdsBanner'
import MovieDetail from './Components/MovieDetail'
import MovieGrid from './Components/MovieGrid'
import Navbar from './Components/Navbar'
import TopMenu from './Components/TopMenu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MovieContex } from './Utils/Context'
import FilmyZila from './Components/FilmyZila'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <>
      <BrowserRouter>
        <MovieContex>
          <HelmetProvider>
            <div className='sticky top-0 z-30'>
              <Navbar />
            </div>
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
          </HelmetProvider>
        </MovieContex>
      </BrowserRouter>
    </>
  )
}

export default App
