import { axiosInstance } from "."


export const MakePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post('/api/bookings/make-payment', { token, amount });
    return response.data
  } catch (err) {
    return err.response
  }
}

// book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post( "/api/bookings/book-show", payload );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetBookingsOfUser = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};