'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getPinnedRepos, getRecentCommits, getContributions } from '@/lib/github';
import { useEffect, useState } from 'react';
import { Github, GitCommit, Star, GitFork, AlertTriangle, ExternalLink, FileCode } from 'lucide-react';

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
      <section className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
        <div className="container mx-auto">
          <div className="bg-red-500/10 text-red-400 border border-red-500/30 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <AlertTriangle size={32} className="mb-3 text-red-400" />
            <h3 className="text-xl font-semibold mb-2 text-red-300">Error Fetching GitHub Data</h3>
            {error}
          </div>
        </div>
      </section>
    );
  }

  // Define a base value for contribution square opacity, e.g., 0.15 for 1 contribution
  const baseOpacity = 0.15;
  const maxOpacity = 1.0;
  // Determine a scale factor, e.g., to reach maxOpacity at 10 contributions
  const scaleFactor = (maxOpacity - baseOpacity) / 10; 

  return (
    <section id="github-activity" className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-center mb-12 text-gray-100"
        >
          <span className="text-accent">GitHub</span> Activity
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Pinned Repositories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-[#27272a] border border-accent/30 rounded-xl p-6 shadow-neon-lg relative min-h-[300px]"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-[#27272a]/70 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-6 text-gray-100 flex items-center"><Github size={24} className="mr-3 text-accent"/>Featured Repositories</h3>
            <div className="space-y-4">
              {repos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05}}
                  className="block p-4 rounded-lg bg-[#222225] hover:bg-accent/10 border border-gray-700/50 hover:border-accent/50 transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium mb-1.5 text-accent/90 group-hover:text-accent transition-colors truncate max-w-[calc(100%-30px)]">{repo.name}</h4>
                    <ExternalLink size={18} className="text-gray-500 group-hover:text-accent transition-colors flex-shrink-0 opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">{repo.description || 'No description provided.'}</p>
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center"><Star size={13} className="mr-1.5 text-yellow-400/70"/> {repo.stargazers_count}</span>
                    <span className="flex items-center"><GitFork size={13} className="mr-1.5 text-sky-400/70"/> {repo.forks_count}</span>
                    {repo.language && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        <FileCode size={12} className="mr-1.5 opacity-80" />{repo.language}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
              {repos.length === 0 && !isLoading && (
                <p className="text-gray-500 text-center py-8">No featured repositories found.</p>
              )}
            </div>
          </motion.div>

          {/* Recent Activity Column */}
          <motion.div 
            className="space-y-8 lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Recent Commits */}
            <div className="bg-[#27272a] border border-accent/30 rounded-xl p-6 shadow-neon-lg relative min-h-[200px]">
              {isLoading && (
                <div className="absolute inset-0 bg-[#27272a]/70 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-5 text-gray-100 flex items-center"><GitCommit size={20} className="mr-3 text-accent"/>Recent Commits</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent pr-1">
                {commits.map((commit, index) => (
                  <motion.a
                    key={commit.sha}
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="block p-3 rounded-md bg-[#222225] hover:bg-accent/10 border border-gray-700/50 hover:border-accent/50 transition-all duration-200 group"
                  >
                    <p className="text-xs text-gray-500 mb-1 group-hover:text-accent/70 transition-colors">
                      {format(new Date(commit.commit.author.date), 'MMM d, yyyy, HH:mm')}
                    </p>
                    <p className="font-medium text-sm text-gray-300 group-hover:text-gray-100 transition-colors truncate line-clamp-2">{commit.commit.message}</p>
                     <p className="text-xs text-gray-500 mt-1 truncate">to <span className="text-accent/60 font-medium">{(commit.html_url.split('/')[4]) || 'unknown-repo'}</span></p>
                  </motion.a>
                ))}
                {commits.length === 0 && !isLoading && (
                  <p className="text-gray-500 text-center py-6">No recent commits found.</p>
                )}
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="bg-[#27272a] border border-accent/30 rounded-xl p-6 shadow-neon-lg relative min-h-[150px]">
              {isLoading && (
                <div className="absolute inset-0 bg-[#27272a]/70 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-5 text-gray-100">Contributions</h3>
              {contributions.length > 0 ? (
                <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                  {contributions.map((contribution) => (
                    <div
                      key={contribution.date}
                      className="aspect-square rounded-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{
                        backgroundColor: `rgba(0, 255, 174, ${
                          contribution.count === 0 ? 0.05 : baseOpacity + Math.min(contribution.count, 10) * scaleFactor
                        })`,
                        border: contribution.count > 0 ? '1px solid rgba(0, 255, 174, 0.3)' : '1px solid rgba(100,100,100,0.1)'
                      }}
                      title={`${contribution.date}: ${contribution.count} contributions`}
                    />
                  ))}
                </div>
                ) : !isLoading && (
                   <p className="text-gray-500 text-center py-4">Contribution data not available.</p>
                )
              }
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity; 