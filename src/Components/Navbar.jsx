import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../Utils/Context';

const Navbar = () => {

    const [getSearch, setSearch] = useState("");
    const [getfound, setFound] = useState(false);
    const { setSearchMovie } = useContext(UserContext);

    const SearchMovie = async () => {
        try {
            setSearchMovie(getSearch);
            const corsProxy = 'https://api.allorigins.win/get?url=';
            const originalUrl = `https://sdmoviespoint.media/?s=${getSearch}`;
            const url = corsProxy + encodeURIComponent(originalUrl);
            const response = await fetch(url);
            const proxyData = await response?.json();
            const parser = new DOMParser();
            const doc = parser?.parseFromString(proxyData.contents, 'text/html');
            // const movieElements = doc?.querySelector('#page #content #main article a')
            const movieElements = doc?.querySelector('#page #content #main')
            const movieNameMatch = doc?.querySelector('#page #content #main header h1')

            // const Movies = [];
            // movieElements?.forEach((movieElements) => {
            //     const movie = {
            //         image: movieElements.querySelector('img')?.src,
            //         link: movieElements.href,
            //         title: movieElements.querySelector('h2')?.textContent,
            //     }
            //     Movies.push(movie);
            // })

            console.log(movieElements);
            if (movieNameMatch?.textContent) {
                setFound(true);
            }
            else {
                setFound(false);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (getSearch.length > 0) {
            SearchMovie();
        }
    }, [getSearch])

    return (
        <div>
            <nav className="p-2 flex justify-between items-center bg-black text-white">
                <button>☰</button>
                <div className='bg-white text-black rounded-full flex items-center px-2 py-1 border-2 border-red-500'>
                    <input type="text" placeholder='search...' value={getSearch} onChange={(e) => { setSearch(e.target.value) }} className='focus:outline-hidden' />
                </div>
            </nav>
        </div>
    )
}

export default Navbar
