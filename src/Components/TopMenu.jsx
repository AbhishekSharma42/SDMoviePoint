import React, { useEffect, useState } from 'react'

const TopMenu = () => {

    const [movies, setMovies] = useState([])

    const CarousalMovie = async () => {
        const res = await fetch('/api');

        const html = await res.text();

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const movieElements = doc.querySelector('.owl-carousel ').querySelectorAll('a');

        const CarousalArray = [];
        movieElements.forEach((el) => {
            CarousalArray.push({
                link: el.href,
                image: el.querySelector('img').getAttribute('data-src'),
            })
        })
        setMovies(CarousalArray);
    }

    useEffect(() => {
        CarousalMovie();
    }, [movies])


    return (
        <div>

            <div className="flex h-40 w-full bg-gray-400 justify-around p-2 gap-1 ">

                {movies.map((movie) => (
                    <a href={movie.link} key={movie.link}>
                        <img src={movie.image} alt={movie.link} className='rounded-md h-full w-full' target="_blank" rel="noopener noreferrer" />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default TopMenu
