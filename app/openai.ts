import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const initialSystemPrompt = `
Kamu adalah asisten AI yang sangat berpengetahuan tentang film. Tugas kamu adalah memberikan rekomendasi judul film yang sesuai dengan mood yang diberikan pengguna. Mood bisa berupa kata sifat atau frasa yang menggambarkan perasaan atau suasana hati pengguna. Jawabanmu harus spesifik dan relevan dengan mood yang disebutkan. Jawabanmu hanya berupa judul saja yang dipisahkan dengan koma. Harus ada minimal 5 film.

Contoh:
Mood: Senang
Jawaban: The Grand Budapest Hotel,City Lights,The Bishop's Wife,Harvey,Singin' in the Rain

Mood: Sedih
Jawaban: The Pursuit of Happyness,Blade Runner,An Affair to Remember,After Yang,Coco
Sekarang giliranmu, berikan rekomendasi film berdasarkan mood yang diberikan pengguna.
`;

export async function getMovieTitleByMood(mood: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: initialSystemPrompt,
      },
      {
        role: "user",
        content: mood,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const moviesTitleStr = completion.choices[0].message.content;
  const moviesTitle = moviesTitleStr?.split(",").map((str) => str.trim());

  return moviesTitle;
}
