import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface movie {
  title: string;
  image: string;
  id: number;
  overview?: string;
  release_date?: string;
  rating?: number;
  vote_average: number;
  poster_path: string;
}
export const MovieDetailPage: React.FC = () => {
  const { movieName } = useParams();
  const [movieDetail, setMovieDetail] = useState<movie>();
  console.log("made it to the detail page", movieName);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY_TMDB}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        const foundMovie = json.results;
        console.log("here is the found movie", foundMovie[0]);
        setMovieDetail(foundMovie[0]);
      });
  }, [movieName]);
  if (!movieDetail) {
    return <p>Loading...</p>;
  }
  return (
    <div className="movie-detail-page">
      <div className="movie-detail-card">
        <h1> {movieDetail.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
          alt={movieDetail.title}
          className="movie-detail-img"
        />
        <h4>Overview:</h4>
        <h3>{movieDetail.overview}</h3>
        <h4>Release Date:</h4>
        <h3>{movieDetail.release_date}</h3>
        <h4>Popularity:</h4>
        <h3>{movieDetail.vote_average.toFixed(2)}</h3>
      </div>
    </div>
  );
};
