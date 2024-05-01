import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetMovieById } from "../../apicalls/movies";
import { GetTheatresByMovie } from "../../apicalls/theatres";
import { message } from "antd";
import moment from "moment";

const TheatresForMovie = () => {
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [hoveredShow, setHoveredShow] = useState(null); // Track hovered show time
  const [theatres, setTheatres] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    const movieId = params.movieId;
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(movieId);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getTheatres = async () => {
    const movieId = params.movieId;
    try {
      dispatch(ShowLoading());
      const response = await GetTheatresByMovie({ date, movie: movieId });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleMouseEnter = (showId) => {
    setHoveredShow(showId);
  };

  const handleMouseLeave = () => {
    setHoveredShow(null);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);

  return (
    <div>
      {movie && (
        <div>
          {/* movie information */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl uppercase">
                {movie.title} ({movie.language})
              </h1>
              <h1 className="text-md">Duration : {movie.duration} mins</h1>
              <h1 className="text-md">
                Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
              </h1>
              <h1 className="text-md">Genre : {movie.genre}</h1>
            </div>
            <div>
              <h1 className="text-md">Select Date</h1>
              <input
                type="date"
                min={moment().format("YYYY-MM-DD")}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  navigate(`/movie/${params.movieId}?date=${e.target.value}`);
                }}
              />
            </div>
          </div>
          <hr />
          {/* movie theatres */}
          <div className="mt-1">
            <h1 className="text-xl uppercase">Theatres</h1>
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {theatres.map((theatre) => (
              <div className="card p-2" key={theatre._id}>
                <h1 className="text-md uppercase">{theatre.name}</h1>
                <h1 className="text-sm">Address : {theatre.address}</h1>
                <div className="divider"></div>
                <div className="flex gap-2">
                  {theatre.shows
                    .sort(
                      (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                    )
                    .map((show) => (
                      <div
                        key={show._id}
                        style={{
                          backgroundColor: hoveredShow === show._id ? '#DF1827' : 'white',
                          color: hoveredShow === show._id ? 'white' : '#DF1827',
                        }}
                        onMouseEnter={() => handleMouseEnter(show._id)}
                        onMouseLeave={handleMouseLeave}
                        className="card p-1 cursor-pointer border-primary"
                        onClick={() => {
                          navigate(`/book-show/${show._id}`);
                        }}
                      >
                        <h1 className="text-sm">
                          {moment(show.time, "HH:mm").format("hh:mm A")}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TheatresForMovie;
