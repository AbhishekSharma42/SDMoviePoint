import React, { useEffect } from 'react'

const FilmyZila = () => {
    const GeMovie = async () => {

        const corsProxy = 'https://api.allorigins.win/get?url=';
        const originalUrl = 'https://www.filmyzilla0.com/sitemap.xml';
        const url = corsProxy + encodeURIComponent(originalUrl);
        const response = await fetch(url);

        const proxyData = await response?.json();
        const parser = new DOMParser();
        const doc = parser?.parseFromString(proxyData.contents, 'text/html');
        const movieDir = doc?.querySelector('.touch');
        console.log(movieDir)
    }

    useEffect(() => {
        GeMovie();
    }, [])

    return (
        <div>
            Hello filmyzila
        </div>
    )
}

export default FilmyZila
