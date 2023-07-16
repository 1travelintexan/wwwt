import { Link } from "react-router-dom";

interface movie {
  title: string;
  image: string;
  id: number;
  overview?: string;
  release_date?: string;
  rating?: number;
}
interface props {
  foundMovie: movie[];
}

export const SearchedMovie: React.FC<props> = ({ foundMovie }: props) => {
  console.log("found movie", foundMovie);
  return (
    <div className="found-movie-container">
      {foundMovie &&
        foundMovie.map((movie: movie) => {
          return (
            <Link key={movie.id} to={`/movie-detail/${movie.title}`}>
              <div className="search-movie-card">
                <img
                  src={movie.image}
                  alt="movie"
                  className="search-movie-img"
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
