export default function Header() {
  return (
    <header>
      <h1
        className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Vivek Aher
      </h1>
      <p className="mt-3 text-base text-body sm:text-lg">
        Software engineer. A notebook — projects, writing, experiments.
      </p>
    </header>
  );
}
