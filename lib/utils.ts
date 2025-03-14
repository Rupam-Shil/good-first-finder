import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseIntegerInput(value: string): number | undefined {
	const parsedValue = parseInt(value);
	return !isNaN(parsedValue) && parsedValue >= 0 ? parsedValue : undefined;
}
