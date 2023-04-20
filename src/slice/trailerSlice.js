import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const trailerSlice = createSlice({
    name: 'trailerPlayer',
    initialState: {
        videoUrl: null,
        loading: false,
        error: null,
        listTrailer: [],
        trailer: {
            videoUrl: null,
            error: null,
        }
    },
    reducers: {
        setVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setListTrailer: (state, action) => {
            state.listTrailer = action.payload
        }
    }
})

export const { 
    setVideoUrl, 
    setLoading, 
    setError,
    setListTrailer,
} = trailerSlice.actions

const getRandomMovie = (list) => {
    const randomIndies = [];
    while (randomIndies.length < 3) {
        const index = Math.floor(Math.random() * list.length);
        if (!randomIndies.includes(index)){
            randomIndies.push(index);
        }
    } 
    const randomData = randomIndies.map((index) => list[index])
    return randomData
}

export const playTrailer = (id) => async (dispatch) => {
    try {
        const ApiGetVideoTrailer = `https://api.themoviedb.org/3/movie/${id}/videos`;
        const response = await axios.get(ApiGetVideoTrailer, {
            params: {
                api_key: '44f95abe374b373cef58b8597abecbd3',
            },
        });
        const videoUrl = `https://www.youtube.com/embed/${response.data.results[0].key}`;
        dispatch(setVideoUrl(videoUrl));
        dispatch(setLoading(true));
    } catch (error) {
        console.log(error);
        setError(true)
    }
}

export const loadListTrailer = (id) => async (dispatch) => {
    try {
        const Api = `https://api.themoviedb.org/3/movie/${id}/videos`
        const response = await axios.get(Api, {
            params: {
                api_key: '44f95abe374b373cef58b8597abecbd3'
            }
        })
        const newListTrailer = response.data.results.map((trailer, index) => {
            return {
                ...trailer,
                videoUrl: `https://www.youtube.com/embed/${response.data.results[index].key}`
            }
        })
        console.log(newListTrailer);
        const randomData = getRandomMovie(newListTrailer)
        console.log(randomData);
        dispatch(setListTrailer(randomData))
    } catch (error) {
        console.log(error);
    }
}

export const turnOffTrailer = () => (dispatch) => {
    dispatch(setVideoUrl(null));
    dispatch(setLoading(false));
}

export default trailerSlice.reducer;