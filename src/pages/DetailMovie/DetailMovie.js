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

    const backgroundImageStyle = {
        backgroundImage: detailMovie.poster_path ? `url(${Images}${detailMovie.backdrop_path})` : 'none',
    };

    return (
        <>
            <div style={{ background: '#0f0f0f' }}>
                <div className="banner" style={backgroundImageStyle} ></div>
                <div className="mb-3 movie-content container">
                    <div className="movie-content__poster">
                        <img className="movie-content__poster__img" src={`${Images}${detailMovie.poster_path}`} />
                    </div>
                    <div className="movie-content__info">
                        <h1 className="title">
                            {detailMovie.title || detailMovie.name}
                        </h1>
                        <div className="genres">
                            {
                                detailMovie.genres && detailMovie.genres.slice(0, 5).map((genre, i) => (
                                    <span key={i} className="genres__item">{genre.name}</span>
                                ))
                            }
                        </div>
                        <p className="overview">{detailMovie.overview}</p>
                        <div className='genres-container'>
                            <h5 className='title'>Genre</h5>
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
                    </div>
                </div>
                <Space direction='vertical' className="container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="section mb-3">
                        <div className='similar-movie'>
                            <h2 className='title'>Similar Movies</h2>
                            <div className='movies-container'>
                                {listSimilarMovie.map((movie) => {
                                    return (
                                        <Fragment>
                                            <div className='similar-movie-item'>
                                                <img
                                                    onClick={() => clickDetailMovie(movie.id)}
                                                    style={{ width: '180px', height: '240px', margin: '10px' }}
                                                    src={`${Images}${movie.poster_path}`}
                                                    alt={movie.title} // Make sure to add the alt attribute for accessibility
                                                />
                                                <h3
                                                    onClick={() => clickDetailMovie(movie.id)}
                                                    style={{ width: '180px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                                    className={toggle ? 'DarkTheme' : 'LightThemeClose'}
                                                >
                                                    {movie.title}
                                                </h3>
                                            </div>

                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <Space direction='vertical' style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                            <Space className='list-trailer' direction='vertical'>
                                {listTrailer.map((trailer) => {
                                    return (
                                        <>
                                            <h1 style={{ display: 'flex', float: 'left', color: 'orangered' }}>{trailer.name}</h1>
                                            <iframe
                                                style={{ width: '100%', height: '320px' }}
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
                    </div>
                </Space>
            </div>
        </>
    )
}

export default DetailMovie