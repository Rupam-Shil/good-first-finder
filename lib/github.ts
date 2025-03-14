import { Octokit } from 'octokit';
import { z } from 'zod';

const githubAccessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

if (!githubAccessToken) {
	throw new Error('GitHub access token is required');
}

export const octokit = new Octokit({
	auth: githubAccessToken,
});

const RepositorySchema = z.object({
	id: z.number(),
	name: z.string(),
	full_name: z.string(),
	html_url: z.string().url(),
	description: z.string().nullable(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	stargazers_count: z.number(),
	language: z.string().nullable(),
	open_issues_count: z.number(),
	topics: z.array(z.string()),
	default_branch: z.string(),
});

export type Repository = z.infer<typeof RepositorySchema>;

export async function searchRepositories({
	language,
	minStars = 0,
	sort = 'stars',
	order = 'desc',
	page = 1,
	per_page = 30,
}: {
	language?: string;
	minStars?: number;
	sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
	order?: 'asc' | 'desc';
	page?: number;
	per_page?: number;
}) {
	try {
		// Build the query to find repositories with good first issues
		const query = `good-first-issues:>0 stars:>${minStars}${
			language ? ` language:${language}` : ''
		}`;

		const response = await octokit.rest.search.repos({
			q: query,
			sort,
			order,
			page,
			per_page,
		});

		const repositories = response.data.items.map((item) =>
			RepositorySchema.parse(item)
		);

		return {
			repositories,
			total_count: response.data.total_count,
			rate_limit: {
				limit: parseInt(response.headers['x-ratelimit-limit'] || '0'),
				remaining: parseInt(response.headers['x-ratelimit-remaining'] || '0'),
				reset: parseInt(response.headers['x-ratelimit-reset'] || '0'),
			},
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error('Invalid response format from GitHub API');
		}
		throw error;
	}
}
