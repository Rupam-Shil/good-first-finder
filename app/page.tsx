'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBox, SearchParams } from '@/components/search/search-box';
import { searchRepositories, type Repository } from '@/lib/github';

const PER_PAGE = 30;

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [lastSearchParams, setLastSearchParams] = useState<SearchParams | null>(
		null
	);

	const handleSearch = async (searchParams: SearchParams, page = 1) => {
		try {
			setIsLoading(true);
			setError(null);
			if (page === 1) {
				setLastSearchParams(searchParams);
			}
			const result = await searchRepositories({
				...searchParams,
				page,
				per_page: PER_PAGE,
			});
			if (page === 1) {
				setRepositories(result.repositories);
			} else {
				setRepositories((prev) => [...prev, ...result.repositories]);
			}
			setTotalCount(result.total_count);
			setCurrentPage(page);
		} catch (err) {
			console.error('Search error:', err);
			setError('Failed to fetch issues. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-8"
			>
				<h1 className="text-4xl font-bold mb-4">
					Find Your First Open Source Contribution
				</h1>
				<p className="text-lg text-muted-foreground">
					Discover beginner-friendly issues from open source projects on GitHub
				</p>
			</motion.div>

			<SearchBox
				onSearch={(params) => handleSearch(params, 1)}
				isLoading={isLoading}
			/>

			{error && <div className="text-red-500 text-center mt-4">{error}</div>}

			<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{repositories.map((repo) => (
					<motion.a
						key={repo.html_url}
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="block p-6 rounded-lg border bg-card text-card-foreground hover:shadow-lg transition-shadow"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.02 }}
					>
						<h2 className="text-xl font-semibold mb-2 line-clamp-2">
							{repo.full_name}
						</h2>
						<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
							{repo.description || 'No description provided'}
						</p>
						<div className="flex flex-wrap gap-2 items-center text-sm">
							<span className="flex items-center gap-1">
								⭐ {repo.stargazers_count.toLocaleString()}
							</span>
							{repo.language && (
								<span className="px-2 py-1 rounded-full bg-primary/10">
									{repo.language}
								</span>
							)}
							<span className="flex items-center gap-1">
								🎯 {repo.open_issues_count} issues
							</span>
						</div>
					</motion.a>
				))}
			</div>

			{!isLoading && repositories.length === 0 && (
				<div className="text-center mt-8 text-muted-foreground">
					No issues found. Try adjusting your search criteria.
				</div>
			)}

			{!isLoading &&
				repositories.length > 0 &&
				repositories.length < totalCount && (
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() =>
							lastSearchParams &&
							handleSearch(lastSearchParams, currentPage + 1)
						}
						className="mx-auto mt-8 block px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
					>
						{isLoading ? 'Loading...' : 'Load More'}
					</motion.button>
				)}
		</main>
	);
}
