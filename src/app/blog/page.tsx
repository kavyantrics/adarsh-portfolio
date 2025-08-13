import fs from 'fs';
import path from 'path';
import { compareDesc } from 'date-fns';
import BlogCard from '@/components/BlogCard';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  image: string | undefined;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(blogDir);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract frontmatter
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;
      
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      const dateMatch = frontmatter.match(/date:\s*(.+)/);
      const descriptionMatch = frontmatter.match(/description:\s*(.+)/);
      const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
      const imageMatch = frontmatter.match(/image:\s*(.+)/);
      
      const slug = file.replace('.mdx', '');
      
      return {
        title: titleMatch ? titleMatch[1].trim() : 'Untitled',
        date: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, '')) : [],
        slug,
        image: imageMatch ? imageMatch[1].trim() : undefined,
      };
    })
    .filter((post): post is BlogPost => post !== null);
  
  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-[#18181b] font-mono text-gray-300">
      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 md:mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4 leading-tight">
              Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my journey in software development
            </p>
          </header>

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