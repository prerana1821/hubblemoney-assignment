export const formatDateToLocal = (dateStr: string): string => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
};

export const isDate = (str: string): boolean => {
  return !isNaN(Date.parse(str));
};
