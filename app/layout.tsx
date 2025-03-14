import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/navbar';
import '@/styles/globals.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Good First Issue - Find Beginner-Friendly Open Source Projects',
	description:
		'Discover beginner-friendly open source projects and issues. Start contributing to open source with carefully curated good first issues from GitHub repositories.',
	keywords:
		'open source, good first issue, beginner-friendly, github, open source contribution, programming, coding',
	authors: [{ name: 'Rupam Shil' }],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://good-first-finder.vercel.app/',
		title: 'Good First Issue - Find Beginner-Friendly Open Source Projects',
		description:
			'Discover beginner-friendly open source projects and issues. Start contributing to open source with carefully curated good first issues from GitHub repositories.',
		siteName: 'Good First Issue',
	},
	twitter: {
		title: 'Good First Issue - Find Beginner-Friendly Open Source Projects',
		description:
			'Discover beginner-friendly open source projects and issues. Start contributing to open source with carefully curated good first issues from GitHub repositories.',
		creator: '@rupam-shil',
	},
	robots: {
		index: true,
		follow: true,
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
