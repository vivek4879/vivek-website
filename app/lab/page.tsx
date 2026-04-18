import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LabList from "@/components/LabList";
import { labItems } from "@/lib/lab";

export const metadata: Metadata = {
  title: "Lab — Vivek Aher",
  description:
    "Things I want to build, am building, or wanted to build but didn't.",
};

export default function LabPage() {
  return (
    <>
      <div className="relative z-[1]">
        <Navbar />
        <main className="px-6 py-24 sm:py-32">
          <section className="mx-auto max-w-3xl">
            <p
              className="mb-4 text-xs uppercase tracking-wider text-cyan"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Lab
            </p>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Lab
            </h1>
            <p className="mb-12 text-body">
              Things I want to build, am building, or wanted to build but
              didn&rsquo;t. Click any item to read more.
            </p>
            <LabList items={labItems} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
