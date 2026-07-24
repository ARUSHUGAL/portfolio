import { ThemeProvider } from './theme/ThemeProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LaserCursor } from './components/ui/LaserCursor';
import { HudFrame } from './components/ui/HudFrame';
import { DiaryFilters } from './components/ui/DiaryFilters';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-canvas-light focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink focus:ring-2 focus:ring-ink dark:focus:bg-canvas-dark dark:focus:text-white dark:focus:ring-white"
      >
        Skip to content
      </a>
      <DiaryFilters />
      <LaserCursor />
      <HudFrame />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
