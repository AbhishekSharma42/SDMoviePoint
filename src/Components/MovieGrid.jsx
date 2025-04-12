import React from 'react'
// import MovieCard from './MovieCard';

const MovieGrid = () => {

    // const [loading, setLoading] = React.useState(true)

    const GeMovie = async () => {

        const corsProxy = 'https://api.allorigins.win/get?url=';
        const originalUrl = 'https://sdmoviespoint.voto/';
        const url = corsProxy + encodeURIComponent(originalUrl);
        const response = await fetch(url);

        const proxyData = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(proxyData.contents, 'text/html');
        // const movieElements = doc.querySelector('.content .primary .post-box')?.querySelectorAll('a');
        console.log(doc);

    }

    GeMovie();

    return (
        <div>
            <div className="grid grid-cols-7 gap-2 justify-items-center">
                <div className="flex flex-col justify-center items-center w-1/4 h-80 bg-gray-200 rounded-lg shadow-md p-4">
                    <img src="https://via.placeholder.com/150" alt="Movie Poster" className="w-full h-3/4 object-cover rounded-lg mb-2" />
                    <h2 className="text-lg font-bold">Movie Title</h2>
                    <p className="text-sm text-gray-600">Movie Description</p>
                </div>

            </div>
        </div>
    )
}

export default MovieGrid
