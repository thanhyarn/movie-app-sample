import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { playTrailer, turnOffTrailer, setLoading } from '../../slice/trailerSlice';
import { deleteFavorite } from '../../slice/favoriteSlice'
import { Button, Modal, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { AiFillDelete } from "react-icons/ai";
import './Favorite.css'


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


            <Space direction='vertical' className={toggle ? "mainBgColor" : "secondaryBgColor"}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >

                <Space className='favorite-mv-list'>
                    <div className='favorite-container'>
                        {movieData.map((movie) => {
                            return (
                                <div key={movie.id} className='favorite-item'>
                                    <div id='container'>
                                        <img src={`${Images}${movie.poster_path}`} onClick={() => clickDetailMovie(movie.id)} />
                                        <h4 onClick={() => clickDetailMovie(movie.id)} className={`favorite-title ${toggle ? 'DarkTheme' : 'LightThemeClose'}`}>{movie.title}</h4>
                                        <Button onClick={() => { handlePlayTrailer(movie.id) }} className='button-trailer'>
                                            <PlayCircleOutlined />
                                            Trailer
                                        </Button>
                                        <Button className='button-delete' onClick={() => handleDelete(movie)}>
                                            <AiFillDelete />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Space>

            </Space>

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