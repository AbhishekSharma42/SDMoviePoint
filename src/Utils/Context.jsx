import { createContext, useState } from "react";

const UserContext = createContext();

const MovieContex = (props) => {
    const [movesDetail, setMovieDetail] = useState([]);

    


    return (
        <UserContext.Provider value={{ movesDetail, setMovieDetail }} >
            {props.children}
        </UserContext.Provider>
    );
}

export { MovieContex, UserContext }