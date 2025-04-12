import React, { useEffect, useRef, useState } from 'react'

const TopMenu = () => {
    const [movies, setMovies] = useState([])
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

    setInterval(() => {
        scroll("right");
    }, 100000);

    const CarousalMovie = async () => {
        const corsProxy = 'https://api.allorigins.win/get?url=';
        const originalUrl = 'https://sdmoviespoint.voto/';
        const url = corsProxy + encodeURIComponent(originalUrl);
        const response = await fetch(url);
        const proxyData = await response.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(proxyData.contents, 'text/html');
        const movieElements = doc.querySelector('.owl-carousel')?.querySelectorAll('a');
        const movieArray = [];
        movieElements?.forEach((el) => {
            movieArray?.push({
                link: el?.href,
                image: el?.querySelector('img')?.getAttribute('data-src'),
            })
        })
        setMovies(movieArray);
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
                    left
                </button>

                <div ref={carouselRef} className="flex no-scrollbar scroll-smooth space-x-4 ">
                    {[...movies, ...movies]?.map((movie, index) => (
                        <a href={`${movie?.link}`} key={`${movie?.id}-${index}`} className="flex-shrink-0 rounded-xl shadow w-25 h-40 py-2 mx-2">
                            <img src={movie?.image} alt={movie?.title} className="rounded-md mb-2 w-fit h-fit border   object-cover mx-auto" />
                        </a>
                    ))}
                </div>

                <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow"> right
                </button>
            </div>
        </div>
    )
}

export default TopMenu
