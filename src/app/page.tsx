import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SectionReveal } from "@/components/SectionReveal";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Languages } from "@/components/sections/Languages";
import { Freelance } from "@/components/sections/Freelance";
import { Explore } from "@/components/sections/Explore";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Education /></SectionReveal>
        <SectionReveal><Languages /></SectionReveal>
        <SectionReveal><Freelance /></SectionReveal>
        <SectionReveal><Explore /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
