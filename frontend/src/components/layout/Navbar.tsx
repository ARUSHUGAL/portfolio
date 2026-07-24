import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../../config/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-canvas-light/85 backdrop-blur-sm transition-colors duration-300 dark:bg-canvas-dark/85 ${
        scrolled || menuOpen ? 'shadow-sm' : ''
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#top"
          className="font-hand text-3xl font-bold leading-none tracking-tight text-ink transition-opacity hover:opacity-70 dark:text-white"
        >
          Arush Ugal
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="border-b-2 border-transparent pb-0.5 text-base text-ink-soft transition-colors hover:border-shu hover:text-ink dark:text-white/60 dark:hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-ink-muted transition-colors hover:text-ink dark:text-white/55 dark:hover:text-white md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Bottom edge — hand-drawn ink rule instead of a hairline. */}
      <div className="section-shell">
        <div className="ink-rule" aria-hidden="true" />
      </div>

      {/* Mobile menu panel — flat, canvas-colored. */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ul className="section-shell flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="last:mb-0">
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-base text-ink-soft transition-colors hover:text-ink dark:text-white/60 dark:hover:text-white"
              >
                {item.label}
              </a>
              <div className="ink-rule opacity-60" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
