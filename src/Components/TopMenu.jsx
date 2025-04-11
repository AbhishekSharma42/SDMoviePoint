import React, { useEffect, useRef, useState } from 'react'

const TopMenu = () => {
    const [movies, setMovies] = useState([])
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        const { current } = carouselRef;
        if (current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Optional: Check position to simulate infinite by rearranging elements
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
            <div className="relative w-full overflow-hidden">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow"
                >
                    left
                </button>

                <div
                    ref={carouselRef}
                    className="flex overflow-x-scroll no-scrollbar scroll-smooth space-x-4"
                >
                    {[...movies, ...movies].map((movie, index) => (
                        <div
                            key={`${movie.id}-${index}`}
                            className="min-w-[200px] flex-shrink-0 bg-white rounded-xl shadow p-4"
                        >
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="rounded-md mb-2 w-full h-40 object-cover"
                            />
                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow"
                >
                    right
                </button>
            </div>

        </div>
    )
}

export default TopMenu
