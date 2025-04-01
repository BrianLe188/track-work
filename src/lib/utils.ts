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

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
}

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
