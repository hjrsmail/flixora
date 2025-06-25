import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies } from "../services/movie.services";

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [bannerIndex, setBannerIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const trend = await getTrendingMovies();
            setTrending(trend);
            setTopRated(await getTopRatedMovies());
            setUpcoming(await getUpcomingMovies());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!trending.length) return;

        const interval = setInterval(() => {
            setBannerIndex((prevIndex) => (prevIndex + 1) % trending.length);
        }, 15000); 

        return () => clearInterval(interval);
    }, [trending]);


    const Banner = ({ movie }: { movie: any }) => {
        return (
            <div className="relative h-[28rem] w-full rounded-xl overflow-hidden mb-10">
                {/* Background blur */}
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-6 flex items-center gap-6 h-full">
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-md w-[130px] h-[195px] object-cover shadow-lg hidden md:block"
                    />

                    {/* Text info */}
                    <div className="max-w-xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{movie.title}</h1>
                        <p className="text-sm text-gray-200 mt-2 line-clamp-3">{movie.overview}</p>
                        <div className="text-gray-300 text-xs mt-3 flex flex-wrap gap-4">
                            <span>Release: {movie.release_date}</span>
                            <span>⭐ {movie.vote_average} ({movie.vote_count} votes)</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const renderSection = (title: string, movies: any[]) => (
        <section className="mb-10 relative border border-gray-900 rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

            {/* Scrollable area with blur effect mask */}
            <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-7 scroll-smooth px-2 mask-fade">
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-[160px]">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-lg w-full h-[240px] object-cover shadow-md mb-2"
                            />
                            <div className="text-left">
                                <h3 className="text-white text-sm font-medium truncate">
                                    {movie.title || movie.name}
                                </h3>
                                <p className="text-gray-400 text-xs mt-0.5">
                                    {movie.release_date
                                        ? new Date(movie.release_date).getFullYear()
                                        : movie.first_air_date
                                            ? new Date(movie.first_air_date).getFullYear()
                                            : "-"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );


    if (!trending.length)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4" />
                <p className="animate-pulse text-sm">Loading movies...</p>
                
            </div>
        );


    return (
        <>
            <title>Flixora | Home</title>
            <meta name="description" content="Movie DB" />
            <AppLayout>
                <div className="p-4">
                    {/* ✅ Banner utama */}
                    {trending[bannerIndex] && <Banner movie={trending[bannerIndex]} />}

                    {/* ✅ Section */}
                    {renderSection("🔥 Trending Movies", trending)}
                    {renderSection("⭐ Top 10 Rated", topRated.slice(0, 10))}
                    {renderSection("📅 Upcoming", upcoming)}
                </div>
            </AppLayout>
        </>
    );
}
