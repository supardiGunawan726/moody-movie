import { Search } from "lucide-react";
import Link from "next/link";

const moodRecommendations = [
  {
    mood: "Sad",
    emot: "🥲",
  },
  {
    mood: "Happy",
    emot: "😁",
  },
  {
    mood: "Angry",
    emot: "😡",
  },
  {
    mood: "Scared",
    emot: "😨",
  },
];

export default async function Home() {
  return (
    <main className="grid place-items-center min-h-screen px-4">
      <section className="grid gap-4">
        <h1 className="text-3xl font-sans font-semibold text-center">
          FIND MOVIES BASED ON YOUR MOOD
        </h1>
        <form
          method="get"
          action="/movies"
          className="w-full max-w-2xl mx-auto"
        >
          <div className="flex items-center bg-white p-1 pr-4 rounded-sm">
            <input
              type="text"
              name="mood"
              id="mood"
              className="flex-1 text-gray-900 p-2 focus:outline-none"
              placeholder="Type your mood"
            />
            <button>
              <Search className="text-black" />
            </button>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {moodRecommendations.map(({ mood, emot }) => (
              <li
                key={mood}
                className="min-w-[80px] max-w-[150px] w-full flex-1 text-nowrap"
              >
                <Link
                  href={`/movies?mood=${mood}`}
                  className="block w-full bg-foreground/5 text-foreground text-center py-1 rounded-sm border border-foreground/5"
                >
                  {mood} {emot}
                </Link>
              </li>
            ))}
          </ul>
        </form>
      </section>
    </main>
  );
}
