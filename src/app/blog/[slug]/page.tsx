import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const [frontmatter, content] = fileContents.split('---').slice(1);
    
    const metadata = frontmatter.split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':');
      if (key && value.length) {
        acc[key.trim()] = value.join(':').trim();
      }
      return acc;
    }, {} as Record<string, string>);
    
    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      description: metadata.description,
      tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : [],
      image: metadata.image,
      content,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPost(params.slug);
  
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
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#18181b] font-mono text-gray-300">
      <article className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              {post.tags.length > 0 && <span className="hidden sm:inline">•</span>}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-200 text-xs font-medium"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </header>

          {post.image && (
            <div className="relative w-full h-auto sm:h-[350px] md:h-[450px] mb-10 md:mb-12 rounded-lg overflow-hidden shadow-lg border border-accent/10">
              <Image
                src={post.image}
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
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
} 