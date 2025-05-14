'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getPinnedRepos, getRecentCommits, getContributions } from '@/lib/github';
import { useEffect, useState } from 'react';

interface GitHubActivityProps {
  initialRepos: Awaited<ReturnType<typeof getPinnedRepos>>;
  initialCommits: Awaited<ReturnType<typeof getRecentCommits>>;
  initialContributions: Awaited<ReturnType<typeof getContributions>>;
}

const GitHubActivity = ({
  initialRepos,
  initialCommits,
  initialContributions,
}: GitHubActivityProps) => {
  const [repos, setRepos] = useState(initialRepos);
  const [commits, setCommits] = useState(initialCommits);
  const [contributions, setContributions] = useState(initialContributions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [newRepos, newCommits, newContributions] = await Promise.all([
          getPinnedRepos(),
          getRecentCommits(),
          getContributions(),
        ]);

        setRepos(newRepos);
        setCommits(newCommits);
        setContributions(newContributions);
      } catch (err) {
        setError('Failed to refresh GitHub data');
        console.error('Error refreshing GitHub data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(fetchData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <section className="pt-20 pb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-8 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 font-heading"
        >
          GitHub Activity
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pinned Repositories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 shadow-lg relative"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-6">Featured Repositories</h3>
            <div className="space-y-4">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg bg-background hover:bg-background/80 transition-colors"
                >
                  <h4 className="text-lg font-medium mb-2">{repo.name}</h4>
                  <p className="text-muted-foreground mb-3">{repo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && (
                      <span className="px-2 py-1 rounded-full bg-primary/10">
                        {repo.language}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <div className="space-y-8">
            {/* Recent Commits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 shadow-lg relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-6">Recent Commits</h3>
              <div className="space-y-4">
                {commits.map((commit) => (
                  <a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-background hover:bg-background/80 transition-colors"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(new Date(commit.commit.author.date), 'MMM d, yyyy')}
                    </p>
                    <p className="font-medium">{commit.commit.message}</p>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 shadow-lg relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-6">Contributions</h3>
              <div className="grid grid-cols-7 gap-1">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.date}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `rgba(var(--primary-rgb), ${
                        Math.min(contribution.count / 5, 1) * 0.2
                      })`,
                    }}
                    title={`${contribution.date}: ${contribution.count} contributions`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity; 