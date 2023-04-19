import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Space } from 'antd'
import './MediaList.css'
import { Link } from 'react-router-dom'
import { fetch5MovieData } from '../../slice/movieSlice'
const MediaList = ({ title, idTitle, toggle }) => {
    const dispatch = useDispatch();
    const [movieData, setMovieData] = useState([]);
    const movieDataPlaying = useSelector((state) => state.movie.movieDataPlaying)
    const movieDataUpcoming = useSelector((state) => state.movie.movieDataUpcoming)
    const movieDataPopular = useSelector((state) => state.movie.movieDataPopular)
    const movieDataToprated = useSelector((state) => state.movie.movieDataToprated)
    console.log(movieDataPlaying);

    useEffect(() => {
        dispatch(fetch5MovieData(idTitle));
        loadMovie();
    }, [dispatch]);
    const loadMovie = () => {
        switch (idTitle) {
            case "now_playing":
                setMovieData(movieDataPlaying)
                console.log(movieData);
                break;
            case "upcoming":
                setMovieData(movieDataUpcoming)
                break;
            case "popular":
                setMovieData(movieDataPopular)
                break;
            case "top_rated":
                setMovieData(movieDataToprated)
                break;
            default:
                break;
        }
    }


    const Images = 'https://image.tmdb.org/t/p/w500';
    


    const clickDetailMovie = (id) => {
        window.location.href = `/detail-movie?id=${id}`
    }

    return (
        <>
            <Space style={{ width: '70%', marginLeft: '15%', display: 'flex', justifyContent: 'space-between' }} direction='horizontal'>
                <Space direction='horizontal'>
                    <div className='divider' style={{ height: '50px', border: '5px solid red' }} > </div>
                    <h3 style={{color: 'goldenrod'}}>{title}</h3>
                </Space>
                <Link to={idTitle}><h4>Xem tất cả</h4></Link>
            </Space>
            <Space direction='vertical' className='media-list-container'>
                <div className='list'>
                    <div className='movies-container '>
                        {movieData.map((movie) => {
                            return (
                                <Fragment>
                                    <div id='container'>
                                        <img src={`${Images}${movie.poster_path}`} onClick={() => clickDetailMovie(movie.id)}/>
                                        <h4 style={{cursor: 'point'}} onClick={() => clickDetailMovie(movie.id)} className={toggle ? 'DarkTheme' : 'LightThemeClose'}>{movie.title}</h4>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </Space>
        </>
    )
}

export default MediaList