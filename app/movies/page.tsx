import { getMovieTitleByMood } from "../openai";
import { SearchMovieResult, getMovieImageUrl, searchMovie } from "../tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageProps } from "@/.next/types/app/layout";
import * as Icon from "lucide-react";
import Link from "next/link";

export default async function Movie(props: PageProps) {
  const { searchParams } = props;
  const mood = searchParams.mood;

  const moviesTitle = await getMovieTitleByMood(mood);

  if (!moviesTitle) return notFound();

  const movies = [];

  for (const title of moviesTitle) {
    const movie = await searchMovie(title);
    movies.push(movie);
  }

  return (
    <main className="grid place-items-center min-h-screen px-4">
      <section className="text-center grid gap-8 max-w-[1000px]">
        <h1 className="text-3xl font-sans font-semibold">
          MOVIES THAT MIGHT FIT WITH YOUR MOOD
        </h1>
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieItem movie={movie} />
            </li>
          ))}
        </ul>
        <footer className="flex items-center justify-center gap-2">
          <Icon.ArrowLeft />
          <Link href="/">Back</Link>
        </footer>
      </section>
    </main>
  );
}

function MovieItem({ movie }: { movie: SearchMovieResult }) {
  return (
    <figure className="grid gap-2">
      <div className="relative aspect-[9/16]">
        <Image
          src={getMovieImageUrl(movie.poster_path, "w500")}
          alt={`poster of ${movie.title} image`}
          fill
        />
      </div>
      <figcaption>
        <header className="flex items-start gap-2">
          <Icon.Star className="text-yellow-400" />{" "}
          {movie.vote_average.toFixed(1)}
        </header>
      </figcaption>
      <h2 className="text-left line-clamp-1">
        <Link
          href={`movies/${movie.id}`}
          className="font-sans font-semibold hover:underline"
        >
          {movie.original_title}
        </Link>
      </h2>
    </figure>
  );
}
