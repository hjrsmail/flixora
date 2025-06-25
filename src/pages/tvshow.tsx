import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { getPopularTvShows } from "../services/movie.services";

type TvShow = {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    release_date: string;
};

export default function TvShow() {
    const [tvShows, setTvShows] = useState<TvShow[]>([]);
    const [selectedShow, setSelectedShow] = useState<TvShow | null>(null);

    useEffect(() => {
        const fetchShows = async () => {
            const data = await getPopularTvShows();
            setTvShows(data);
        };
        fetchShows();
    }, []);


    if (!tvShows.length)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4" />
                <p className="animate-pulse text-sm">Loading movies...</p>
            </div>
        );

    return (
        <>
            <title>Flixora | TV Shows</title>
            <meta name="description" content="Movie DB" />

            <AppLayout>
                <div className="p-4 lg:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        📺 Popular TV Shows
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {tvShows.map((show) => (
                            <div
                                key={show.id}
                                onClick={() => setSelectedShow(show)}
                                className="cursor-pointer transition-transform hover:scale-[1.03]"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                                    alt={show.name}
                                    className="rounded-lg w-full h-[240px] object-cover shadow-md"
                                />
                                <div className="mt-2">
                                    <h3 className="text-sm font-semibold text-white truncate">
                                        {show.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        ⭐ {show.vote_average.toFixed(1)}
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {selectedShow && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedShow(null)}>
                        <div
                            className="bg-zinc-900 p-6 rounded-2xl shadow-2xl w-[90%] max-w-3xl text-white relative"
                            onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedShow(null)}
                                className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400">
                                &times;
                            </button>

                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${selectedShow.poster_path}`}
                                    alt={selectedShow.name}
                                    className="w-[300px] h-[440px] object-cover rounded-lg shadow-md"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                                        {selectedShow.name}
                                    </h2>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
                                        {selectedShow.overview || "No description available."}
                                    </p>
                                    <div className="text-sm text-gray-400 mt-4 space-y-1">
                                        <p>⭐ {selectedShow.vote_average} ({selectedShow.vote_count} votes)</p>
                                        <p>📅 First aired: {selectedShow.first_air_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AppLayout>
        </>
    );
}
