import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold font-heading mb-4 text-foreground">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-foreground/60">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="text-sm px-2 py-1 rounded-full bg-primary/10 text-secondary hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </header>

          {post.image && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
} 