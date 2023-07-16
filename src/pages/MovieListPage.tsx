import { Link } from "react-router-dom";

interface movie {
  title: string;
  image: string;
  id: number;
}
interface props {
  movies: movie[];
}

export const MovieList: React.FC<props> = ({ movies }) => {
  return (
    <>
      <h2>Top Picks</h2>
      <div className="top-movies-container">
        {movies &&
          movies.map((movie: any) => {
            return (
              <Link key={movie.id} to={`/movie-detail/${movie.title}`}>
                <div className="movie">
                  <img src={movie.image} alt="movie" />
                  <h6>{movie.title}</h6>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
