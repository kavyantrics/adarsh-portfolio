// Validate environment variables
if (!process.env.GITHUB_USERNAME) {
  console.warn('GITHUB_USERNAME is not set in environment variables');
}

if (!process.env.GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN is not set in environment variables');
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'adarshkumarsingh83';

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

interface GitHubContribution {
  date: string;
  count: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
  };
}

const fallbackRepos: GitHubRepo[] = [
  {
    name: "adarsh-portfolio",
    description: "My personal portfolio website built with Next.js and Tailwind CSS",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    html_url: "https://github.com/adarshkumarsingh83/adarsh-portfolio"
  },
  {
    name: "project-2",
    description: "A full-stack web application with modern technologies",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    html_url: "https://github.com/adarshkumarsingh83/project-2"
  }
];

const fallbackCommits: GitHubCommit[] = [
  {
    sha: "abc123",
    commit: {
      message: "Initial commit",
      author: {
        date: new Date().toISOString()
      }
    },
    html_url: "https://github.com/adarshkumarsingh83/adarsh-portfolio/commit/abc123"
  }
];

const fallbackContributions: GitHubContribution[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  count: Math.floor(Math.random() * 5)
}));

export async function getPinnedRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_TOKEN) {
    console.warn('GitHub token not found, using fallback data');
    return fallbackRepos;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch pinned repos, using fallback data');
      return fallbackRepos;
    }

    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return fallbackRepos;
  }
}

export async function getRecentCommits(): Promise<GitHubCommit[]> {
  if (!GITHUB_TOKEN) {
    console.warn('GitHub token not found, using fallback data');
    return fallbackCommits;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch recent commits, using fallback data');
      return fallbackCommits;
    }

    const events = await response.json() as GitHubEvent[];
    return events
      .filter((event) => event.type === 'PushEvent')
      .map((event) => ({
        sha: event.payload.commits![0].sha,
        commit: {
          message: event.payload.commits![0].message,
          author: {
            date: event.created_at,
          },
        },
        html_url: event.payload.commits![0].url,
      }));
  } catch (error) {
    console.error('Error fetching recent commits:', error);
    return fallbackCommits;
  }
}

export async function getContributions(): Promise<GitHubContribution[]> {
  if (!GITHUB_TOKEN) {
    console.warn('GitHub token not found, using fallback data');
    return fallbackContributions;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch contributions, using fallback data');
      return fallbackContributions;
    }

    const events = await response.json() as GitHubEvent[];
    const contributions: { [key: string]: number } = {};

    events.forEach((event) => {
      const date = event.created_at.split('T')[0];
      contributions[date] = (contributions[date] || 0) + 1;
    });

    return Object.entries(contributions).map(([date, count]) => ({
      date,
      count,
    }));
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return fallbackContributions;
  }
} 