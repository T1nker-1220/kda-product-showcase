import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlaceholderImage(text: string = "Image Coming Soon") {
  return `https://placehold.co/600x400/1f2937/f97316?text=${encodeURIComponent(text)}&font=montserrat`
} 