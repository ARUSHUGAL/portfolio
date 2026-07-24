/**
 * Hidden SVG defs providing the hand-drawn "rough" filter used by .sketch /
 * .diary-card. feTurbulence + feDisplacementMap nudges edges so straight
 * borders read like they were inked by hand.
 */
export function DiaryFilters() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: 'absolute' }}
    >
      <defs>
        <filter id="diary-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
