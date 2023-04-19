import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { playTrailer, turnOffTrailer, setLoading } from '../../slice/trailerSlice';
import { deleteFavorite } from '../../slice/favoriteSlice'
import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
const Favorite = ({ toggle }) => {
    const dispatch = useDispatch();
    const movieData = useSelector((state) => state.favorite.movieData) || [];
    const videoUrl = useSelector((state) => state.trailer.videoUrl);
    const isLoad = useSelector((state) => state.trailer.loading)
    const Images = 'https://image.tmdb.org/t/p/w500';

    const handlePlayTrailer = async (id) => {
        dispatch(playTrailer(id));
    }

    const handleOk = () => {
        dispatch(setLoading(false))
    }

    const handleCancel = () => {
        dispatch(turnOffTrailer())
    }

    const handleDelete = (movie) => {
        dispatch(deleteFavorite(movie));
    }

    const clickDetailMovie = (id) => {
        window.location.href = `/detail-movie?id=${id}`
    }
    return (
        <Fragment>
            <div className={toggle ? "mainBgColor" : "secondaryBgColor"}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >

                < div className='movies-container'>
                    {movieData && movieData.map((movie) => {
                        return (
                            <Fragment>
                                <div id='container'>
                                    <img onClick={() => clickDetailMovie(movie.id)} src={`${Images}${movie.poster_path}`} />
                                    <h3 onClick={() => clickDetailMovie(movie.id)} className={toggle ? 'DarkTheme' : 'LightThemeClose'}>{movie.title}</h3>
                                    <Button onClick={() => { handlePlayTrailer(movie.id) }} className='button-trailer'>
                                        <PlayCircleOutlined />
                                        Trailer
                                    </Button>
                                    <Button onClick={() => {handleDelete(movie)}} className='button-delete'>
                                        <PlayCircleOutlined />
                                        Xóa
                                    </Button>
                                </div>

                            </Fragment>
                        )
                    })}
                </div>
            </div>
            <Modal className='modal-trailer' open={isLoad} onOk={handleOk} onCancel={handleCancel}>
                <iframe
                    style={{ width: '100%', height: '800px' }}
                    src={videoUrl}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                ></iframe>
            </Modal>
        </Fragment >
    )
}

export default Favorite