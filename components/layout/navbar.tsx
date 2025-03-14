'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 hover:from-background/100 hover:to-background/95">
			<div className="container flex h-16 items-center justify-between space-x-4">
				<div className="flex items-center px-6">
					<Link
						href="/"
						className="flex items-center space-x-3 transition-transform hover:scale-105"
					>
						<span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							Good First Issue
						</span>
					</Link>
				</div>

				<div className="flex items-center px-4">
					<nav className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full hover:bg-primary/10 transition-colors duration-200"
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						>
							<SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	);
}
