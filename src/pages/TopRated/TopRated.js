import React from 'react'
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlayCircleOutlined, HeartOutlined } from '@ant-design/icons'
import axios from 'axios';
import { Button, Space } from 'antd';
import { fetchMovieData } from '../../slice/movieSlice';
import { playTrailer, turnOffTrailer, setLoading } from '../../slice/trailerSlice';
import { Modal } from 'antd';
import { addFavorite, deleteFavorite } from '../../slice/favoriteSlice'
import { toast } from 'react-hot-toast';
import PaginationMovie from '../../component/PaginationMovie';
import { useLocation } from 'react-router-dom';


const TopRated = ({ toggle, id }) => {
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie.movieDataToprated) || [];
  const videoUrl = useSelector((state) => state.trailer.videoUrl);
  const isLoad = useSelector((state) => state.trailer.loading)
  const totalPage = useSelector((state) => state.movie.totalPage)
  const Images = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();
  const queryParans = new URLSearchParams(location.search)
  const page = queryParans.get("page")

  useEffect(() => {
    dispatch(fetchMovieData(id));
  }, [dispatch]);


  const handlePlayTrailer = async (id) => {
    dispatch(playTrailer(id));
  }

  const handleOk = () => {
    dispatch(setLoading(false))
  }

  const handleCancel = () => {
    dispatch(turnOffTrailer())
  }

  const handleFavorite = async (movie) => {
    console.log(movie);
    dispatch(addFavorite(movie))
  }

  const clickDetailMovie = (id) => {
    window.location.href = `/detail-movie?id=${id}`
  }

  return (
    <Fragment>


      <Space direction='vertical' className={toggle ? "mainBgColor" : "secondaryBgColor"}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >

        <Space className='list-movies'>
          <div className='movies-container'>
            {movieData.map((movie) => {
              return (
                <div key={movie.id} className='movie-item'>
                  <div id='container'>
                    <img src={`${Images}${movie.poster_path}`} onClick={() => clickDetailMovie(movie.id)} />
                    <h4 onClick={() => clickDetailMovie(movie.id)} className={`movie-title ${toggle ? 'DarkTheme' : 'LightThemeClose'}`}>{movie.title}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </Space>
        <div>
          <PaginationMovie page={page} totalPage={totalPage} id={id} />
        </div>
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

export default TopRated


