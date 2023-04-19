import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const trailerSlice = createSlice({
    name: 'trailerPlayer',
    initialState: {
        videoUrl: null,
        loading: false,
        error: null,
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
        }
    }
})

export const { setVideoUrl, setLoading, setError } = trailerSlice.actions

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

export const turnOffTrailer = () => (dispatch) => {
    dispatch(setVideoUrl(null));
    dispatch(setLoading(false));
}

export default trailerSlice.reducer;