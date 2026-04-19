import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LabList from "@/components/LabList";
import { labItems, getLabDetailSlugs } from "@/lib/lab";

export const metadata: Metadata = {
  title: "Lab — Vivek Aher",
  description:
    "Things I want to build, am building, or wanted to build but didn't.",
};

export default function LabPage() {
  const detailSlugs = getLabDetailSlugs();

  return (
    <>
      <div className="relative z-[1]">
        <Navbar />
        <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
          <h1
            className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lab
          </h1>
          <p className="mt-3 text-body">
            Things I want to build, am building, or wanted to build but
            didn&rsquo;t. Click any item to read more.
          </p>
          <div className="mt-12">
            <LabList items={labItems} detailSlugs={detailSlugs} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
