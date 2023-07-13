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
              <div className="movie" key={movie.id}>
                <img src={movie.image} alt="movie" />
                <h6>{movie.title}</h6>
              </div>
            );
          })}
      </div>
    </>
  );
};
