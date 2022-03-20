import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(value === 0) navigate('/');
        else if(value === 1) navigate('/movies');
        else if(value === 2) navigate('/series');
        else if(value ===3) navigate('/search');
    }, [value, navigate]);

    return (
        <Box sx={{ 
            width: '100%',
            position: 'fixed',
            bottom: 0,
            zIndex: 100,
            }}>
            <BottomNavigation
                showLabels
                value={value}
                style={{backgroundColor: '#2d3443'}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                style={{color: '#fff'}}
                label="Trending" 
                icon={<WhatshotIcon />} />
                <BottomNavigationAction 
                style={{color: '#fff'}}
                label="Movies" 
                icon={<MovieIcon />} />
                <BottomNavigationAction 
                style={{color: '#fff'}}
                label="TV series" 
                icon={<TvIcon />} />
                <BottomNavigationAction 
                style={{color: '#fff'}}
                label="Search" 
                icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );
}
