import React from 'react'
// import MovieCard from './MovieCard';

const MovieGrid = () => {

    // const [loading, setLoading] = React.useState(true)

    const GeMovie = async () => {
        const res = await fetch('/api');
        const html = await res?.text();
        const parser = new DOMParser();
        const doc = parser?.parseFromString(html, 'text/html');

        console.log(doc);
    }

    GeMovie();

    return (
        <div>
            <div className="grid grid-cols-7 gap-2 justify-items-center">

            </div>
        </div>
    )
}

export default MovieGrid
