import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTgzMDFlZGQ2MGEzN2Y3NDlmMzhlNGFmMTJjZDE3YSIsIm5iZiI6MTc0NTQxNjIyNS44NzY5OTk5LCJzdWIiOiI2ODA4ZjAyMTI3NmJmNjRlNDFhYjY0ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NA_LMt6-MUBLAvxMRkZtBoUif4p9YQ6aYZo-lv4-PUE'
  }
};

const RecommendedMovies = ({ movieTitles }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (title) => {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`;

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return data.results?.[0] || null;
    } catch (err) {
      console.error(`Error fetching "${title}":`, err);
      return null;
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const results = await Promise.all(movieTitles.map(fetchMovie));
      setMovies(results.filter(Boolean));
      setLoading(false);
    };

    if (movieTitles?.length) loadMovies();
  }, [movieTitles]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e50914]"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {movies.map(movie => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-[#232323] rounded-lg overflow-hidden shadow hover:scale-105 transition"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-gray-400 text-sm">
              No Image
            </div>
          )}
          <div className="p-2">
            <h3 className="text-sm font-semibold text-white truncate" title={movie.title}>{movie.title}</h3>
            <span className="text-xs text-gray-400">
              {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedMovies;
