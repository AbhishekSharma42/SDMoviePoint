import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const MovieDetail = () => {


    const [getMovie, setMovie] = useState([])
    const { str } = useParams();

    const movieDetail = async () => {
        try {
            const corsProxy = 'https://api.allorigins.win/get?url=';
            const url = corsProxy + encodeURIComponent(`https://sdmoviespoint.diy/${str}`);
            const response = await fetch(url);
            const proxyData = await response?.json();
            const parser = new DOMParser();
            const doc = parser?.parseFromString(proxyData.contents, 'text/html');
            const movieElements = doc?.querySelector('.entry-content');
            const MovieLink = doc?.querySelector('.entry-content tbody tr td form input[name="filename"]');

            const movieData = {
                img: movieElements?.querySelector('p strong img')?.src,
                title: doc?.querySelector('.entry-title')?.textContent,
                downloadlink: MovieLink?.value,
            }
            setMovie(movieData)

        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    useEffect(() => {
        movieDetail();
    }, [str])

    return (
        <>
            <div className="flex md:text-2xl flex-col justify-center items-center mt-5">
                <h2 className={`text-md font-semibold mt-2 text-center px-3 ${getMovie?.title ? "" : "h-6 w-full md:w-[50%] bg-gray-400 rounded-xl animate-pulse"} `}>{getMovie?.title}</h2>
                <h1 className="text-xl font-bold pt-2 underline">Movie Detail</h1>
                <div className="flex flex-col items-center mt-5">
                    <img src={`${getMovie?.img}`} className={` ${getMovie?.img ? "" : "h-6 bg-gray-400 rounded-xl animate-pulse"} w-72 h-96 object-cover rounded-lg shadow-md`} />
                    <span>overview</span>
                    <h2 className={`text-md font-semibold mt-2 text-center px-3 ${getMovie?.title ? "" : "h-6 w-full md:w-[50%] bg-gray-400 rounded-xl animate-pulse"} `}>{getMovie?.title}</h2>
                    <p className="text-gray-600 mt-1">Release Date: 2023-10-01</p>
                    <p className="text-gray-600 mt-1">Genre: Action, Adventure</p>
                    <p className="text-gray-600 mt-1">Rating: 8.5/10</p>
                    <p className="text-gray-600 mt-1">Description: This is a brief description of the movie.</p>
                    <div className='w-full mt-4 mx-auto flex justify-center items-center gap-5'>

                        {getMovie.length === 0 ?
                            <div className="h-6 w-40 bg-gray-400 rounded-xl animate-pulse text-center p-2"></div> :
                            <Link to={`https://new.sdshare.cfd/s/${getMovie?.downloadlink}`} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Download</Link>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail
