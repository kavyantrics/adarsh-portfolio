import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Simple function to convert basic Markdown/MDX to HTML
function markdownToHtml(content: string): string {
  return content
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg shadow-lg border border-accent/10 mb-6" />')
    
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-accent mb-4 mt-6">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-accent mb-4 mt-8">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-semibold text-accent mb-6 mt-8">$1</h1>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[#222225] border border-gray-700 rounded-lg p-4 overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-accent/10 text-accent px-2 py-1 rounded text-sm">$1</code>')
    
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-200">$1</strong>')
    
    // Lists
    .replace(/^\* (.*$)/gim, '<li class="text-gray-300 mb-2">$1</li>')
    .replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-4 space-y-2">$1</ul>')
    
    // Paragraphs
    .replace(/^(?!<[h|u|p|d|s|li|pre|img])(.+)$/gim, '<p class="text-gray-300 mb-4 leading-relaxed">$1</p>')
    
    // Remove extra empty paragraphs
    .replace(/<p class="text-gray-300 mb-4 leading-relaxed"><\/p>/g, '')
    .replace(/<p class="text-gray-300 mb-4 leading-relaxed">\s*<\/p>/g, '');
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
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
  
  const content = fileContent.replace(/^---\n[\s\S]*?\n---/, '').trim();
  
  // Validate image path
  const imagePath = imageMatch ? imageMatch[1].trim().replace(/"/g, '') : undefined;
  const isValidImage = imagePath && fs.existsSync(path.join(process.cwd(), 'public', imagePath.startsWith('/') ? imagePath.slice(1) : imagePath));
  
  return {
    title: titleMatch ? titleMatch[1].trim() : 'Untitled',
    date: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
    description: descriptionMatch ? descriptionMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, '')) : [],
    image: isValidImage ? imagePath : undefined,
    content,
    slug,
  };
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(blogDir);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Adarsh Portfolio`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#18181b] font-mono text-gray-300">
      <article className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium text-sm border border-accent/20 hover:border-accent/40 rounded-lg hover:bg-accent/5"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>

          <header className="mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <a
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-200 text-xs font-medium"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </header>

          {post.image && (
            <div className="relative w-full h-auto sm:h-[350px] md:h-[450px] mb-10 md:mb-12 rounded-lg overflow-hidden shadow-lg border border-accent/10">
              <Image
                src={post.image.startsWith('/') ? post.image : `/${post.image}`}
                alt={post.title}
                fill={true}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none font-mono 
                          prose-headings:text-accent prose-headings:font-semibold 
                          prose-p:text-gray-300 prose-li:text-gray-300 
                          prose-a:text-accent prose-a:no-underline hover:prose-a:underline 
                          prose-strong:text-gray-200 
                          prose-blockquote:border-accent prose-blockquote:bg-[#222225] prose-blockquote:text-gray-400 
                          prose-code:bg-accent/10 prose-code:text-accent prose-code:p-1 prose-code:rounded-md prose-code:text-sm 
                          prose-pre:bg-[#222225] prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
          </div>
        </div>
      </article>
    </div>
  );
}
