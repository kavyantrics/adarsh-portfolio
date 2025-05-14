'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  image?: string;
}

const BlogCard = ({ title, description, date, tags, slug, image }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-background border border-primary/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {image && (
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
          <time dateTime={date}>
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
        </div>
        
        <Link href={`/blog/${slug}`}>
          <h2 className="text-xl font-bold font-heading mb-2 text-foreground hover:text-accent transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-foreground/70 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-secondary hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard; 