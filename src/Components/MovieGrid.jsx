import React from 'react'
import MovieCard from './MovieCard';

const MovieGrid = () => {
    return (
        <div>
            <div className="grid grid-cols-7 gap-2 justify-items-center">
                {[...Array(10)].map((_, i) => <MovieCard key={i} />)}
            </div>
        </div>
    )
}

export default MovieGrid
