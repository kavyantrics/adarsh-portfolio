import fs from 'fs';
import path from 'path';
import { compareDesc } from 'date-fns';
import BlogCard from '@/components/BlogCard';

async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter
    const frontmatter = fileContents.split('---')[1];
    const metadata = frontmatter.split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':');
      if (key && value.length) {
        acc[key.trim()] = value.join(':').trim();
      }
      return acc;
    }, {} as Record<string, string>);
    
    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: metadata.title,
      date: metadata.date,
      description: metadata.description,
      tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
      image: metadata.image,
    };
  });

  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export const metadata = {
  title: 'Blog | Adarsh Portfolio',
  description: 'Read my thoughts on software development, design, and technology.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Get all unique tags
  const tags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="min-h-screen bg-[#18181b] font-mono text-gray-300">
      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider mb-12 md:mb-16 text-accent text-center">
            Blog
          </h1>
          
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100 text-center uppercase tracking-wide">Filter by Tag</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog/tags/${tag}`}
                  className="px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-[#18181b] hover:border-accent transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-neon-sm"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid gap-10 md:gap-12">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 