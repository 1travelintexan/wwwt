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

export const SearchedMovie: React.FC<props> = ({ foundMovie }) => {
  console.log("found movie", foundMovie);
  return (
    <div className="found-movie-container">
      {foundMovie &&
        foundMovie.map((movie: any) => {
          return (
            <div className="movie" key={movie.id}>
              <img src={movie.image} alt="movie" />
              <h6>{movie.title}</h6>
            </div>
          );
        })}
    </div>
  );
};
