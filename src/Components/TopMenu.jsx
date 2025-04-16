import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useContext } from 'react';
import { UserContext } from '../Utils/Context';

const TopMenu = () => {
    const [movies, setMovies] = useState([])
    const movieArray = [];

    const { movieUrl, corsProxy } = useContext(UserContext);

    const carouselRef = useRef(null);

    const scroll = (direction) => {
        const { current } = carouselRef;
        if (current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });

            setTimeout(() => {
                const children = Array.from(current.children);
                if (direction === "right") {
                    const first = children[0];
                    current.appendChild(first);
                    current.scrollLeft -= first.offsetWidth;
                } else {
                    const last = children[children.length - 1];
                    current.prepend(last);
                    current.scrollLeft += last.offsetWidth;
                }
            }, 300);
        }
    };

    const CarousalMovie = async () => {
        const url = corsProxy + encodeURIComponent(movieUrl);
        const response = await fetch(url);
        const proxyData = await response.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(proxyData.contents, 'text/html');
        const movieElements = doc.querySelector('.owl-carousel')?.querySelectorAll('a');


        movieElements?.forEach((el) => {
            movieArray?.push({
                link: el?.href,
                image: el?.querySelector('img')?.getAttribute('data-src'),
            })
        })
        setMovies(movieArray);

        console.log()
    }

    useEffect(() => {
        CarousalMovie();
    }, [movies])

    return (
        <div>
            <div className="relative w-full overflow-hidden ">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow"
                >
                    <FaArrowLeft />
                </button>

                <div ref={carouselRef} className="flex no-scrollbar scroll-smooth space-x-4 ">
                    {[...movies, ...movies]?.map((movie, index) => (
                        <Link to={`/move-detail/${movie?.link?.replace('https://sdmoviespoint.diy/', '').replaceAll('/', '')}`} key={`${movie?.id}-${index}`} className="flex-shrink-0 rounded-xl shadow w-25 h-40 py-2 mx-2">
                            <img src={movie?.image} alt={movie?.title} className="rounded-md mb-2 w-fit h-fit border   object-cover mx-auto" />
                        </Link>
                    ))}
                </div>

                {
                    movies?.length === 0 && (
                        <div className="flex justify-center items-center col-span-3 sm:col-span-4 md:col-span-5 xl:col-span-7 h-40">
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    )
                }

                <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow">
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default TopMenu
