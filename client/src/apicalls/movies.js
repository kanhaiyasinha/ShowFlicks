const {axiosInstance} = require('.')

//Get all movies

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get('api/movies/getAllMovies')
        return response.data
    } catch (error) {
        return error
    }
}

//Add Movies

export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies/add', payload)
        return response.data
    } catch (error){
        return error
    }
}

//Update Movies

export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies/update', payload)
        return response.data
    } catch (error){
        return error
    }
}

