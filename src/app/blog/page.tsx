import fs from 'fs';
import path from 'path';
import { compareDesc } from 'date-fns';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  image: string | undefined;
}

function isValidImagePath(imagePath: string): boolean {
  if (!imagePath) return false;
  
  // Check if the image exists in the public folder
  const publicPath = path.join(process.cwd(), 'public', imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
  return fs.existsSync(publicPath);
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
      
      const imagePath = imageMatch ? imageMatch[1].trim().replace(/"/g, '') : undefined;
      
      return {
        title: titleMatch ? titleMatch[1].trim() : 'Untitled',
        date: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, '')) : [],
        slug,
        image: imagePath && isValidImagePath(imagePath) ? imagePath : undefined,
      };
    })
    .filter((post): post is BlogPost => post !== null);
  
  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#1a1a1d] to-[#18181b] font-mono text-gray-300">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Back Button - Top Left Corner */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium text-sm border border-accent/20 hover:border-accent/40 rounded-lg hover:bg-accent/5"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Compact Header */}
          <header className="mb-10 md:mb-12 text-center">
            <div className="relative">
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-3xl blur-3xl"></div>
              
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4 leading-tight bg-gradient-to-r from-gray-100 via-accent to-gray-100 bg-clip-text text-transparent">
                Adarsh&apos;s Digital Diary
              </h1>
              <p className="relative text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Chronicles of a developer who sometimes forgets to save files and occasionally writes code that actually works
              </p>
              
              {/* Decorative elements */}
              <div className="flex justify-center mt-6 space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-accent/40 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </header>

          {/* Blog Posts Grid - 3 cards per row with tighter spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <BlogCard
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  slug={post.slug}
                />
              </div>
            ))}
          </div>

          {/* Compact Footer Section */}
          {posts.length > 0 && (
            <div 
              className="mt-12 text-center animate-fade-in-up"
              style={{
                animationDelay: '500ms',
                animationFillMode: 'both'
              }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/5 border border-accent/20 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-accent/80 text-sm font-medium">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} and counting...
                </span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 