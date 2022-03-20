import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenres';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Series = () => {
    const [page, setPage] = useState();
    const [content, setContent] =useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
            );
            
        setContent(data.results);
        setNumOfPages(data.total_pages);    
    };

    useEffect(() => {
        fetchMovies();
    }, [page, genreForURL]);

    return (
        <div>
            <span className="pageTitle">Series</span>
            <Genres
                type='tv' 
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
                        key={c.id} id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type='tv'
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

export default Series;