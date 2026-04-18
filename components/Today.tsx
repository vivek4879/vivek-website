// Update this whenever your current focus changes.
// Keep it short — one or two sentences, present tense.
const TODAY =
  "Building an AI-native dance choreography platform at Q IT Technologies. Studying systems design on the side, and writing about what I learn.";

export default function Today() {
  return (
    <section aria-labelledby="today">
      <h2
        id="today"
        className="mb-3 text-xs uppercase tracking-wider text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Today
      </h2>
      <p className="text-base text-body sm:text-lg">{TODAY}</p>
    </section>
  );
}
