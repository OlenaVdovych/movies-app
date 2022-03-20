import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';

import '../Carousel/Carousel.css';
import './ContentModal.css';

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '90%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 700,
    // height: 500,
    bgcolor: '#39445a',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'white',
    boxShadow: '8px 6px 16px #252687',
    padding: 6,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US`
        );

        setContent(data);
        // console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIES_APP_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div 
            onClick={handleOpen} 
            className='media'
            style={{cursor: 'pointer'}}
            color='inherit'
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                    <Box sx={style}>
                        <div className='contentModal'>
                            <img 
                            alt={content.name || content.title}
                            className='contentModal__portrait'
                            src={
                                content.poster_path 
                                ? `${img_500}/${content.poster_path}` 
                                : unavailable
                            } 
                            />
                            <img 
                            src={
                                content.backdrop_path 
                                ? `${img_500}/${content.backdrop_path}` 
                                : unavailableLandscape
                            } 
                            alt={content.name || content.title}
                            className='contentModal__landscape'
                            />
                            <div className='contentModal__about'>
                                <span className='contentModal__title'>
                                    {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            '_____'
                                        ).substring(0, 4)}
                                    )
                                </span>
                                <i className='tagline'>{content.tagline}</i>
                                <span className='contentModal__description'>
                                    {content.overview}
                                </span>
                                <div>
                                    <Carousel media_type={media_type} id={id}/>
                                </div>
                                <Button
                                variant='outlined'
                                startIcon={<YouTubeIcon/>}
                                color='primary'
                                target='__blank'
                                href={`https://www.youtube.com/watch?v=${video}`}>
                                    Watch the trailer
                                </Button>
                            </div>
                        </div>
                    </Box>
                    )}
                </Fade>
            </Modal>
        </div>
    );
}