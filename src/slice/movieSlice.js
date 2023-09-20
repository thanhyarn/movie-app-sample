import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    detailMovie: {},
    movieDataPlaying: [],
    movieDataUpcoming: [],
    movieDataPopular: [],
    movieDataToprated: [],
    movieDataTrend: [],
    movieDataSearch: [],
    movieDataSimilar: [],
    movieDataRandomPlaying: [],
    movieDataRandomPopular: [],
    movieDataRandomUpcoming: [],
    movieDataRandomToprated: [],
    listContact: {},
    totalPage: 50,
  },
  reducers: {
    

    setMovieDataPlaying: (state, action) => {
      state.movieDataPlaying = action.payload;
    },
    setMovieDataUpcoming: (state, action) => {
      state.movieDataUpcoming = action.payload;
    },
    setMovieDataPopular: (state, action) => {
      state.movieDataPopular = action.payload;
    },
    setMovieDataToprated: (state, action) => {
      state.movieDataToprated = action.payload;
    },
    setMovieDataTrend: (state, action) => {
      state.movieDataTrend = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    },
    setMovieDataSearch: (state, action) => {
      state.movieDataSearch = action.payload
    },
    setDetailMovie: (state, action) => {
      state.detailMovie = action.payload
    },
    setListContact: (state, action) => {
      state.listContact = action.payload;
    },
    setMovieDataSimilar: (state, action) => {
      state.movieDataSimilar = action.payload;
    },
    setMovieDataRandomPlaying: (state, action) => {
      state.movieDataRandomPlaying = action.payload
    },
    setMovieDataRandomUpcoming: (state, action) => {
      state.movieDataRandomUpcoming = action.payload
    },
    setMovieDataRandomPopular: (state, action) => {
      state.movieDataRandomPopular = action.payload
    },
    setMovieDataRandomToprated: (state, action) => {
      state.movieDataRandomToprated = action.payload
    }
  },
});

export const {
  setMovieDataPlaying,
  setMovieDataUpcoming,
  setMovieDataPopular,
  setMovieDataToprated,
  setMovieDataTrend,
  setTotalPage,
  setMovieDataSearch,
  setDetailMovie,
  setListContact,
  setMovieDataSimilar,
  setMovieDataRandomPlaying,
  setMovieDataRandomPopular,
  setMovieDataRandomToprated,
  setMovieDataRandomUpcoming
} = movieSlice.actions;


export const fetchMovieDataTrend = (page) => async (dispatch) => {
  const Api = "https://api.themoviedb.org/3/trending/all/day";
  console.log("join to fetchMovieDataTrend");
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3',
        page: page,
      }
    })
    const result = data.data.results
    console.log(result);
    dispatch(setTotalPage(data.data.total_pages))
    console.log(data.data.total_pages);
    dispatch(setMovieDataTrend(result));
  } catch (error) {
    console.log(error);
  }
}


export const fetchMovieData = (id, page) => async (dispatch) => {
  const Api = `https://api.themoviedb.org/3/movie/${id}`
  console.log(Api);
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3',
        page: page,
      }
    })
    const result = data.data.results;
    dispatch(setTotalPage(data.data.total_pages))
    console.log(data.data.total_pages);
    switch (id) {
      case "now_playing":
        dispatch(setMovieDataPlaying(result));
        break;
      case "upcoming":
        dispatch(setMovieDataUpcoming(result));
        break;
      case "popular":
        dispatch(setMovieDataPopular(result));
        break;
      case "top_rated":
        dispatch(setMovieDataToprated(result));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}


const getRandomMovie = (list) => {
  const randomIndies = [];
  while (randomIndies.length < 4) {
    const index = Math.floor(Math.random() * list.length);
    if (!randomIndies.includes(index)) {
      randomIndies.push(index);
    }
  }
  const randomdata = randomIndies.map((index) => list[index])
  return randomdata;
}


export const fetch5MovieData = (id) => async (dispatch) => {
  console.log(id);

  const Api = `https://api.themoviedb.org/3/movie/${id}`
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3'
      }
    })
    const result = data.data.results


    const dataRandom = getRandomMovie(result)

    console.log(dataRandom);
    switch (id) {
      case "now_playing":
        dispatch(setMovieDataRandomPlaying(dataRandom));
        break;
      case "upcoming":
        dispatch(setMovieDataRandomUpcoming(dataRandom));
        break;
      case "popular":
        dispatch(setMovieDataRandomPopular(dataRandom));
        break;
      case "top_rated":
        dispatch(setMovieDataRandomToprated(dataRandom));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

export const fetchMovieDataSearch = (query, page) => async (dispatch) => {
  const Api = `https://api.themoviedb.org/3/search/movie`
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3',
        query: query,
        page: page
      }
    })
    const result = data.data.results;
    console.log(result);
    dispatch(setMovieDataSearch(result))
    dispatch(setTotalPage(data.data.total_pages))
  } catch (error) {
    console.log(error);
  }
}

export const fetchDetailMovie = (id) => async (dispatch) => {
  const Api = `https://api.themoviedb.org/3/movie/${id}`
  console.log('join to fetchDetailMovie');
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3',
        // language: 'vi-VN'
      }
    })
    console.log(data);
    dispatch(setDetailMovie(data.data))
  } catch (error) {
    console.log(error);
  }
}

export const fetchListContask = (id) => async (dispatch) => {
  const Api = `https://api.themoviedb.org/3/movie/${id}/external_ids`
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3',
      }
    })
    console.log(data.data);
    dispatch(setListContact(data.data))
  } catch (error) {
    console.log(error);
  }
}

export const fetchSimilarMovie = (id) => async (dispatch) => {
  const Api = `https://api.themoviedb.org/3/movie/${id}/similar`;
  try {
    const data = await axios.get(Api, {
      params: {
        api_key: '44f95abe374b373cef58b8597abecbd3'
      }
    })
    const result = data.data.results;
    const randomMovie = getRandomMovie(result)
    dispatch(setMovieDataSimilar(randomMovie))
  } catch (error) {
    console.log(error);
  }
}


export default movieSlice.reducer;
