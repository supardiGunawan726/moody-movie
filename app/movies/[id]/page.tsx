import { PageProps } from "@/.next/types/app/layout";
import { getMovieDetail, getMovieImageUrl } from "@/app/tmdb";
import Image from "next/image";

export default async function Movie(props: PageProps) {
  const movie = await getMovieDetail(props.params.id);

  return (
    <main className="grid gap-8 pb-10">
      <header className="relative aspect-[16/7]">
        <Image
          src={getMovieImageUrl(movie.backdrop_path)}
          alt={`backdrop of ${movie.original_title} movie`}
          className="object-cover"
          fill
        />
        <div className="container mx-auto px-4">
          <div className="absolute bottom-4 flex items-end gap-2 md:gap-8 md:bottom-8">
            <figure className="relative w-[60px] aspect-[9/16] shadow-lg rounded-md overflow-hidden md:w-[100px] lg:w-[200px]">
              <Image
                src={getMovieImageUrl(movie.poster_path, "w500")}
                alt={`poster of ${movie.original_title} movie`}
                className="object-cover"
                fill
              />
            </figure>
            <div className="relative z-10">
              <h1 className="font-sans text-xl font-semibold line-clamp-2 leading-tight md:text-3xl lg:text-6xl">
                {movie.original_title} ({movie.release_date.split("-")[0]})
              </h1>
              <p>{movie.tagline}</p>
            </div>
          </div>
        </div>
      </header>
      <section className="container mx-auto grid gap-2 px-4">
        <header>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Duration: {renderDuration(movie.runtime)}</p>
          <p>Rating: {movie.vote_average}</p>
        </header>
        <section className="grid gap-3">
          <span className="block font-bold text-2xl">Overview</span>
          <p>{movie.overview}</p>
        </section>
      </section>
    </main>
  );
}

function renderDuration(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours ? hours + " hours" : ""} ${
    minutes ? minutes + " minutes" : ""
  }`.trim();
}
