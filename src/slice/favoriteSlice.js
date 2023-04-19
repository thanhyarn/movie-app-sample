import { createSlice , current } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState: {
        movieData: [],
        //message: "",
    },
    reducers: {
        addFavorite: (state, action) => {
            const movie = action.payload;
            if (validateFavotire(movie, state.movieData)){
                state.movieData.push(movie)
                toast.success("Thêm vào yêu thích")
            }
        },
        deleteFavorite: (state, action) => {
            const movieDeleted = action.payload;
            const listData = current(state.movieData)
            const listMovieAfterUpdate = [];
            listData.forEach((movie) => {
                if (movie.id != movieDeleted.id){
                    listMovieAfterUpdate.push(movie);
                }
            })
            state.movieData = [...listMovieAfterUpdate]
            toast.success("Xóa thành công")
        },
    }
})

const validateFavotire = (movie , listMovie) => {
    const found = listMovie.find(element => element.id == movie.id)
    if (!found){
        return true;
    } else {
        toast.error("Phim đã được yêu thích trước đó")
        return false;
    }
}

export const { addFavorite, deleteFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer;