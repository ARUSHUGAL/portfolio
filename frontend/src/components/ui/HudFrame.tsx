/**
 * A thin, anime/HUD-style overlay frame: hairline corner brackets at the
 * viewport edges plus a small vertical kana caption. Purely decorative and
 * non-interactive; kept subtle so it reads as an accent, not a gimmick.
 */
export function HudFrame() {
  const corner = 'pointer-events-none fixed z-40 h-6 w-6 border-shu/70';
  return (
    <div aria-hidden="true" className="hidden select-none sm:block">
      {/* Corner brackets */}
      <span className={`${corner} left-4 top-4 border-l border-t`} />
      <span className={`${corner} right-4 top-4 border-r border-t`} />
      <span className={`${corner} bottom-4 left-4 border-b border-l`} />
      <span className={`${corner} bottom-4 right-4 border-b border-r`} />

      {/* Vertical kana caption, right edge */}
      <div className="pointer-events-none fixed right-5 top-1/2 z-40 -translate-y-1/2">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-muted/70 dark:text-white/40"
          style={{ writingMode: 'vertical-rl' }}
        >
          設計 &nbsp;/&nbsp; SEKKEI &mdash; BACKEND ENGINEER
        </p>
      </div>

      {/* Small fixed index, left edge */}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ink-muted/60 dark:text-white/35">
          ARUSH&nbsp;UGAL &middot; アルシュ・ウガル
        </p>
      </div>
    </div>
  );
}
