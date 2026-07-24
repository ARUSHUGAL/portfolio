const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** Format a "YYYY-MM" string into e.g. "Jul 2026". */
export function formatMonthYear(value: string | null): string {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  const monthIndex = Number(month) - 1;
  const label = MONTHS[monthIndex] ?? '';
  return label ? `${label} ${year}` : year;
}

/** Format a date range from two "YYYY-MM" strings. */
export function formatDateRange(start: string, end: string | null, current: boolean): string {
  const startLabel = formatMonthYear(start);
  const endLabel = current ? 'Present' : formatMonthYear(end);
  return `${startLabel} — ${endLabel}`;
}

/**
 * Sort experience-like entries reverse-chronologically by start date
 * ("YYYY-MM" strings sort lexicographically, which matches chronological order).
 */
export function sortByStartDateDesc<T extends { startDate: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.startDate.localeCompare(a.startDate));
}
