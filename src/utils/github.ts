type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
};

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGithubUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}