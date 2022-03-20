import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, createTheme, Tabs, Tab, ThemeProvider } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#0971f1'
            },
        },
    });

    const fetchSearch = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&query=${searchText}&page=${page}`)
    
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display: 'flex', margin: '15px'}}>
                    <TextField
                        style={{flex: 1}}
                        className='searchBox'
                        label='Search'
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant='contained' onClick={fetchSearch}> <SearchOutlinedIcon/> </Button>
                </div>

                <Tabs 
                value={type}
                indicatorColor='primary'
                textColor='primary'
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                style={{ paddingBottom: 5 }}>
                    <Tab style={{width: '50%'}} label='Search Movies'></Tab>
                    <Tab style={{width: '50%'}} label='Search TV Series'></Tab>
                </Tabs>

            </ThemeProvider>
            <div className='trending'>
                {
                    content && content.map((c) => 
                        <SingleContent 
                        key={c.id} id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date}
                        media_type='movies'
                        vote_average={c.vote_average}
                        />
                    )
                }
                {searchText &&
                !content &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Search;