import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { OfficeGalleryA } from "@/components/sections/OfficeGalleryA";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <OfficeGalleryA />
      <Portfolio />
      <Contact />
    </>
  );
}
