import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Utils/Context';
import { Link } from 'react-router-dom';
// import MovieCard from './MovieCard';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const Movies = [];


    const { setMovieDetail } = useContext(UserContext);

    const GeMovie = async () => {

        const corsProxy = 'https://api.allorigins.win/get?url=';
        const originalUrl = 'https://sdmoviespoint.voto/page/2/';
        const url = corsProxy + encodeURIComponent(originalUrl);
        const response = await fetch(url);

        const proxyData = await response?.json();
        const parser = new DOMParser();
        const doc = parser?.parseFromString(proxyData.contents, 'text/html');
        const movieElements = doc?.querySelector('main')?.querySelectorAll('.post-box-media a');

        movieElements?.forEach((movieElements) => {
            const movie = {
                image: movieElements.querySelector('img')?.src,
                link: movieElements.href,
                title: movieElements.querySelector('h2')?.textContent,
            }
            Movies.push(movie);
        })
        setMovies(Movies);
    }

    useEffect(() => {
        GeMovie();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">
                {
                    movies.map((item) => {
                        return (

                            <Link to={`/move-detail/`} onClick={() => setMovieDetail(item.link)} key={item.link} className="flex flex-col justify-center items-center  bg-gray-200 rounded-lg shadow-md">
                                <img src={`${item.image}`} alt="Movie Poster" className="w-35 h-50 sm:w-fit sm:h-fit  object-cover rounded-lg " />
                                <h2 className="text-lg font-bold">{item.title}</h2>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MovieGrid
