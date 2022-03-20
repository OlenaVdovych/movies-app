import React, {useEffect} from 'react';

import axios from 'axios';
import { Chip } from '@mui/material';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

        const fetchGenres = async () => {
            const {data} = await axios.get(
                `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US`
            );

            setGenres(data.genres);
        };

        useEffect(() => {
            fetchGenres();

            return () => {
                setGenres({});
            }
        }, []);

    return (
        <div style={{padding: '6px 0'}}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{margin: 2}}
                    label={genre.name}
                    clickable
                    color='primary'
                    size='small'
                    key={genre.id}
                    onDelete={() => handleRemove(genre)}
                />
        ))}
            {genres.map((genre) => (
                <Chip
                    style={{margin: 2}}
                    label={genre.name}
                    clickable
                    color='primary'
                    variant='outlined'
                    size='small'
                    key={genre.id}
                    onClick={() => handleAdd(genre)}
                />
        ))}
        </div>
    )
}

export default Genres;
