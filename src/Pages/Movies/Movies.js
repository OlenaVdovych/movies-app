import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenres';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] =useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
            // `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
            );
            
        setContent(data.results);
        setNumOfPages(data.total_pages);    
    };

    useEffect(() => {
        fetchMovies();
    }, [genreForURL, page]);

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres
                type='movie' 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                genres={genres} 
                setGenres={setGenres} 
                setPage={setPage}
            />
            <div className='trending'>
                {
                    content && content.map((c) => 
                        <SingleContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type='movies'
                        vote_average={c.vote_average}
                        />
                    )
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Movies;