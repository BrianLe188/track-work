import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TimeAgo, { Locale } from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

TimeAgo.addDefaultLocale(en);
export function timeAgo(locale: Locale | Locale[], date: Date | string) {
  const time = new TimeAgo(locale);

  if (date instanceof Date) {
    return time.format(date);
  }

  if (typeof date === "string") {
    return time.format(new Date(date));
  }
}
