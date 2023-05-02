import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { fetchDetailMovie, fetchListContask, fetchSimilarMovie } from '../../slice/movieSlice';
import { Space, Button } from 'antd';
import { BsFacebook, BsInstagram, BsTwitter, BsWikipedia } from "react-icons/bs"
import './DetailMovie.css'
import { loadListTrailer } from '../../slice/trailerSlice';
import { addFavorite } from '../../slice/favoriteSlice';
const DetailMovie = ({ toggle }) => {
    const iconClass = toggle ? 'icon white-icon' : 'icon black-icon';
    const location = useLocation();
    const queryParans = new URLSearchParams(location.search)
    const id = queryParans.get("id")
    const dispatch = useDispatch();
    const detailMovie = useSelector((state) => state.movie.detailMovie) || {}
    const listContact = useSelector((state) => state.movie.listContact)
    const listSimilarMovie = useSelector((state) => state.movie.movieDataSimilar) || []
    const listTrailer = useSelector((state) => state.trailer.listTrailer) || []
    console.log(listTrailer);
    console.log(detailMovie);
    const Images = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        dispatch(fetchDetailMovie(id));
        dispatch(fetchListContask(id));
        dispatch(fetchSimilarMovie(id));
        dispatch(loadListTrailer(id))
        console.log(detailMovie);
    }, [dispatch])

    function convertRuntime(runtimeInMinutes) {
        const hours = Math.floor(runtimeInMinutes / 60);
        const minutes = runtimeInMinutes % 60;
        return `${hours}h ${minutes}m`;
    }

    function convertRevenue(value) {
        const formattedValue = new Intl.NumberFormat('en-US').format(value);
        return `${formattedValue}$`
    }

    const clickDetailMovie = (id) => {
        window.location.href = `/detail-movie?id=${id}`
    }

    const handleFavorite = async (movie) => {
        dispatch(addFavorite(movie))
    }

    return (
        <Space className={`detail-movie-container ${toggle ? "mainBgColor" : "secondaryBgColor"}`} direction='vertical'>
            <Space direction='horizontal'>
                <div className='poster'>
                    <Space direction='vertical'>
                        <img src={`${Images}${detailMovie.poster_path}`} />
                        <div className='revenue-info'>
                            <h1>Revenue : {detailMovie.revenue ? convertRevenue(detailMovie.revenue) : "Not updated yet"}</h1>
                        </div>
                        <div>
                            <Button
                                onClick={() => handleFavorite(detailMovie)}
                                className='favorite-btn'
                            >Favorite</Button>
                        </div>
                    </Space>
                </div>
                <Space direction='vertical' className='info'>
                    <h3 className='movie-title'>{detailMovie.title}</h3>
                    <div className='movie-detail'>
                        <Space direction='horizontal' className='movie-detail'>
                            <Space direction='vertical' className='set'>
                                <label>Release Date</label>
                                <span>{detailMovie.release_date}</span>
                            </Space>
                            <Space direction='vertical' className='set'>
                                <label>Runtime</label>
                                <span>{convertRuntime(detailMovie.runtime)}</span>
                            </Space>
                            <Space direction='vertical' className='set'>
                                <label>Vote Average</label>
                                <span>{detailMovie.vote_average}</span>
                            </Space>
                            <Space direction='vertical' className='set'>
                                <label>Vote Count</label>
                                <span>{detailMovie.vote_count}</span>
                            </Space>
                        </Space>
                        <div className='genres-container'>
                            <h2 className='title'>Genre</h2>
                            <div className='list-genres'>
                                {detailMovie.genres && detailMovie.genres.map((genresItem) => {
                                    return (
                                        <>
                                            <h3 className='genres-item'>{genresItem.name}</h3>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='overview'>
                            <div className='title'>
                                <h2>Overview</h2>
                            </div>
                            <div id='content'>
                                <h4>{detailMovie.overview}</h4>
                            </div>
                        </div>
                        {listContact && <Space className='contact' direction='horizontal'>
                            <h2 className='title'>
                                Contact :
                            </h2>
                            {listContact.facebook_id &&
                                <Link to={`https://www.facebook.com/${listContact.facebook_id}`} target="_blank">
                                    <BsFacebook className={iconClass} />
                                </Link>
                            }
                            {listContact.instagram_id &&
                                <Link to={`https://www.instagram.com/${listContact.instagram_id}`} target="_blank">
                                    <BsInstagram className={iconClass} />
                                </Link>
                            }
                            {listContact.twitter_id &&
                                <Link to={`https://www.twitter.com/${listContact.twitter_id}`} target="_blank">
                                    <BsTwitter className={iconClass} />
                                </Link>
                            }
                            {listContact.wikidata_id &&
                                <Link to={`https://www.wikidata.org/wiki/${listContact.wikidata_id}`} target="_blank">
                                    <BsWikipedia className={iconClass} />
                                </Link>
                            }
                        </Space>}
                        <div className='similar-movie'>
                            <h2 className='title'>Similar Movies</h2>
                            <div className='movies-container'>
                                {listSimilarMovie.map((movie) => {
                                    return (
                                        <Fragment>
                                            <div id='list-similar-movie'>
                                                <img onClick={() => clickDetailMovie(movie.id)} style={{ width: '180px', height: '240px', margin: '10px' }} src={`${Images}${movie.poster_path}`} />
                                                <h3 onClick={() => clickDetailMovie(movie.id)} style={{ width: '120px' }} className={toggle ? 'DarkTheme' : 'LightThemeClose'}>{movie.title}</h3>
                                                {/* <Button onClick={() => { handlePlayTrailer(movie.id) }} className='button-trailer'>
                                                <PlayCircleOutlined />
                                                Trailer
                                            </Button>
                                            <Button className='button-favorite' onClick={() => handleFavorite(movie)}>
                                                <HeartOutlined />
                                                Yêu thích
                                            </Button> */}
                                            </div>

                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Space>
            </Space>
            <Space direction='vertical' style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Space className='list-trailer' direction='vertical'>
                    {listTrailer.map((trailer) => {
                        return (
                            <>
                                <h1 style={{ display: 'flex', float: 'left', color: 'orangered' }}>{trailer.name}</h1>
                                <iframe
                                    style={{ width: '100%', height: '720px' }}
                                    src={trailer.videoUrl}
                                    frameborder='0'
                                    allow='autoplay; encrypted-media'
                                    allowfullscreen
                                ></iframe>
                            </>
                        )
                    })}
                </Space>
            </Space>
        </Space>
    )
}

export default DetailMovie