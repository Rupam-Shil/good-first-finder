'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { parseIntegerInput } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export type SearchParams = {
	language?: string;
	minStars?: number;
	sort: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
	order: 'asc' | 'desc';
};

type SearchBoxProps = {
	onSearch: (params: SearchParams) => void;
	isLoading?: boolean;
};

const LANGUAGES = [
	'JavaScript',
	'TypeScript',
	'Python',
	'Java',
	'Go',
	'Rust',
	'C++',
	'Ruby',
	'Solidity',
	'Cairo',
];

const SORT_OPTIONS = [
	{ value: 'stars', label: 'Stars' },
	{ value: 'forks', label: 'Forks' },
	{ value: 'help-wanted-issues', label: 'Help Wanted Issues' },
	{ value: 'updated', label: 'Last Updated' },
];

export function SearchBox({ onSearch, isLoading = false }: SearchBoxProps) {
	const [searchParams, setSearchParams] = useState<SearchParams>({
		sort: 'stars',
		order: 'desc',
	});

	const handleSearch = () => {
		onSearch(searchParams);
	};

	return (
		<div className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4">
			<div className="flex gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="string"
						min="0"
						placeholder="Minimum stars..."
						value={searchParams.minStars}
						onChange={(e) => {
							const val = parseIntegerInput(e.target.value);
							setSearchParams({ ...searchParams, minStars: val });
						}}
						className="pl-9"
					/>
				</div>
				<Select
					value={searchParams.language}
					onValueChange={(value) =>
						setSearchParams({ ...searchParams, language: value })
					}
				>
					<SelectTrigger className="w-32">
						<SelectValue placeholder="Language" />
					</SelectTrigger>
					<SelectContent>
						{LANGUAGES.map((lang) => (
							<SelectItem key={lang.toLowerCase()} value={lang.toLowerCase()}>
								{lang}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex gap-2">
				<Select
					value={searchParams.sort}
					onValueChange={(value) =>
						setSearchParams({
							...searchParams,
							sort: value as
								| 'stars'
								| 'forks'
								| 'help-wanted-issues'
								| 'updated',
						})
					}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						{SORT_OPTIONS.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={searchParams.order}
					onValueChange={(value) =>
						setSearchParams({ ...searchParams, order: value as 'asc' | 'desc' })
					}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Order" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="desc">Descending</SelectItem>
						<SelectItem value="asc">Ascending</SelectItem>
					</SelectContent>
				</Select>
				<Button onClick={handleSearch} disabled={isLoading}>
					{isLoading ? 'Searching...' : 'Search'}
				</Button>
			</div>
		</div>
	);
}
