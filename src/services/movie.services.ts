import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const getTopRatedMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const getUpcomingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const getPopularTvShows = async (): Promise<any[]> => {
  const res = await axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return res.data.results;
};

export const getPopularMovies = async (): Promise<any[]> => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
	params: {
	  api_key: API_KEY,
	  language: "en-US",
	  page: 1,
	},
  });
  return res.data.results;
};

