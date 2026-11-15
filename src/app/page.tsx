import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Recognition } from "@/components/Recognition";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Recognition />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
