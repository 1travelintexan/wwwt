import { MantineProvider, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import "./App.css";
import { Search } from "./components/Search";
import { MovieList } from "./pages/MovieListPage";
import { Header } from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SearchedMovie } from "./pages/SearchedMoviePage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
type movie = {
  title: string;
  image: string;
  id: number;
  overview?: string;
  release_date?: string;
  rating?: number;
};
export default function App() {
  const [topMovies, setTopMovies] = useState<movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedMovies, setSearchMovies] = useState<movie[]>([
    { title: "", image: "", id: 0, overview: "", release_date: "", rating: 0 },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=&region=US";
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
        console.log("here are the movie,", json);
        setTopMovies(
          json.results.map((movie: any) => {
            return {
              title: movie.original_title,
              image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
              id: movie.id,
            };
          })
        );
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  const handleSearch = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
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
        const foundMovies = json.results
          .sort((movieA: any, movieB: any) => {
            let movieADate = Number(movieA.release_date.slice(0, 4));
            let movieBDate = Number(movieB.release_date.slice(0, 4));
            return movieBDate - movieADate;
          })
          .map((movie: any) => {
            return {
              title: movie.original_title,
              image: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date,
              rating: movie.vote_average,
            };
          });
        setSearchMovies(foundMovies);
        console.log(json.results);
        navigate(`/search-movie/${searchTerm}`);
      })
      .catch((err) => console.error("error:" + err));
  };
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <Header />
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </MantineProvider>
      <Routes>
        <Route path="/" element={<MovieList movies={topMovies} />} />
        <Route
          path="/search-movie/:movieName"
          element={<SearchedMovie foundMovie={searchedMovies} />}
        />
        <Route path="/movie-detail/:movieName" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}
