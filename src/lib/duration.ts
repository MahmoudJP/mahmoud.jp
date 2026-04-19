export function calcDuration(start: string, end: string): string {
  const parseDate = (s: string) => {
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const parts = s.trim().split(" ");
    if (parts.length === 2) {
      return new Date(parseInt(parts[1]), months[parts[0]] || 0);
    }
    return new Date(parseInt(parts[0]), 0);
  };

  const startDate = parseDate(start);
  const endDate = end === "Present" ? new Date() : parseDate(end);
  const isPresent = end === "Present";
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) + (isPresent ? 1 : 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const m = Math.max(months, 1);
  if (years === 0) return `${m} mo`;
  if (months === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${m} mo`;
}
