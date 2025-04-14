import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
    const [getMovie, setMovie] = useState([])
    const { str } = useParams();


    const movieDetail = async () => {
        const corsProxy = 'https://api.allorigins.win/get?url=';
        const url = corsProxy + encodeURIComponent(`https://sdmoviespoint.voto/${str}`);
        const response = await fetch(url);


        const proxyData = await response?.json();
        const parser = new DOMParser();
        const doc = parser?.parseFromString(proxyData.contents, 'text/html');
        const movieElements = doc?.querySelector('.entry-content');

        console.log(movieElements);

        const movieData = {
            img: movieElements?.querySelector('p strong img')?.src,
            title: movieElements?.querySelector('div h1 span strong').innerHTML,
        }
        setMovie(movieData)
    }
    useEffect(() => {
        movieDetail();
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="text-3xl font-bold">Movie Detail</h1>
                <div className="flex flex-col items-center mt-5">
                    <img src={`${getMovie?.img}`} alt="Movie Poster" className="w-72 h-96 object-cover rounded-lg shadow-md" />
                    <span>overview</span>
                    <h2 className="text-xl font-semibold mt-2">{getMovie?.title}</h2>
                    <p className="text-gray-600 mt-1">Release Date: 2023-10-01</p>
                    <p className="text-gray-600 mt-1">Genre: Action, Adventure</p>
                    <p className="text-gray-600 mt-1">Rating: 8.5/10</p>
                    <p className="text-gray-600 mt-1">Description: This is a brief description of the movie.</p>
                </div>
            </div>
        </>
    )
}

export default MovieDetail
