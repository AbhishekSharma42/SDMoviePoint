import { createContext, useState } from "react";

const UserContext = createContext();

const MovieContex = (props) => {
    const [movesDetail, setMovieDetail] = useState([]);
    const [movieUrl] = useState("https://sdmoviespoint.diy");
    const [corsProxy] = useState("https://api.allorigins.win/get?url=");

    return (
        <UserContext.Provider value={{ movesDetail, setMovieDetail, movieUrl, corsProxy }} >
            {props.children}
        </UserContext.Provider>
    );
}

export { MovieContex, UserContext }