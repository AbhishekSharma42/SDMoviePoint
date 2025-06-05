import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    
    const Movies = [];

    const GeMovie = async () => {

        const corsProxy = 'https://api.allorigins.win/get?url=';
        const originalUrl = 'https://sdmoviespoint.media/page/100';
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
        console.log(Movies);
    }

    useEffect(() => {
        GeMovie();
    }, [])

    return (
        // <Helmet>

        <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">
                {
                    movies?.map((item) => {
                        return (
                            <Link to={`/move-detail/${item.link.replace('https://sdmoviespoint.diy/', '').replaceAll('/', '')}`} key={item.link} className="flex flex-col justify-center items-center  bg-gray-200 rounded-lg shadow-md">
                                <img src={`${item.image}`} alt="Movie Poster" className="w-35 h-50 sm:w-fit sm:h-fit  object-cover rounded-lg " />
                                <h2 className="text-lg font-bold">{item.title}</h2>
                            </Link>
                        )
                    })
                }
                {
                    movies?.length === 0 && (
                        <div className="flex justify-center items-center col-span-3 sm:col-span-4 md:col-span-5 xl:col-span-7 h-96">
                            <p className="text-gray-500 text-xl">Loading...</p>
                        </div>
                    )
                }
            </div>
        </div>
        // </Helmet>/
    )
}

export default MovieGrid
